import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";
import { createToken, decodeToken } from "../config/jwt.js";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let model = initModels(sequelize);

// { "full_name":"", "email":"" , "pass_word":"" }
// quy định email không trùng => login
const userSignUp = async (req, res) => {
  let { user_name, user_email, password } = req.body;

  // check email
  let checkEmail = await model.users.findOne({
    where: {
      user_email: user_email,
    },
  });

  if (checkEmail) {
    res.send("Email đã tồn tại");
    return;
  }
  // yarn add bcrypt => salt
  let passCrypt = bcrypt.hashSync(password, 10);

  let newData = {
    user_name,
    user_email,
    password: passCrypt, // mã hóa pass word
    insta_app_id: "",
  };

  // await model.users.create(newData); // INSERT INTO VALUES
  await prisma.users.create({ data: newData });

  res.send("Đăng ký thành công");
};

const userLogin = async (req, res) => {
  let { user_email, password } = req.body;

  let checkEmail = await model.users.findOne({
    where: {
      user_email: user_email,
    },
  });

  if (checkEmail) {
    let checkPass = bcrypt.compareSync(password, checkEmail.password); // true, false
    if (checkPass) {
      // json web token
      // checkEmail => token
      let token = createToken({ checkEmail, password: "" }); // mã hóa 2 chiều
      res.send(token);
    } else {
      res.send("Mật khẩu không đúng");
    }
  } else {
    res.send("Email không đúng");
  }
};

const userGetInfoById = async (req, res) => {
  let { user_id } = req.body;

  let data = await prisma.users.findUnique({
    where: {
      user_id: user_id,
    },
  });

  res.send(data);
};

const userLoginFacebook = async (req, res) => {
  let { id, user_name, user_email } = req.body;

  let newData = {
    user_name: user_name,
    user_email: user_email,
    insta_app_id: id,
  };
  let checkUser = await model.users.findOne({
    where: {
      insta_app_id: id,
    },
  });

  if (!checkUser) {
    // không tồn tại
    await model.users.create(newData);
    checkUser = await model.users.findOne({
      where: {
        insta_app_id: id,
      },
    });
  }
  let token = createToken({ checkEmail: checkUser, password: "" });

  res.send(token);
};

const updateInfo = async (req, res) => {
  let { user_name, user_email, password } = req.body;
  let { token } = req.headers;

  let userInfo = decodeToken(token);

  let { user_id } = userInfo.data.checkEmail;
  let infoUser = await prisma.users.findUnique({
    where: {
      user_id: user_id,
    },
  });

  console.log(infoUser);

  let passCrypt = bcrypt.hashSync(password, 10);
  // spread operator
  infoUser = { ...infoUser, user_name, user_email, password: passCrypt };
  await prisma.users.update({
    data: infoUser,
    where: {
      user_id: user_id,
    },
  });
  res.send("info updated");
};

// file system
import fs from "fs";
import compress_images from "compress-images";

export const uploadAvatar = async (req, res) => {
  let file = req.file;

  compress_images(
    process.cwd() + "/public/img/" + file.filename,
    process.cwd() + "/public/file/",
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "1"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    },
    function (error, completed, statistic) {
      console.log("-------------");
      console.log(error);
      console.log(completed);
      console.log(statistic);
      console.log("-------------");
    }
  );
  res.send("");

  // tối ưu hình ảnh => giảm quality
  // 1 = 100Kb
  // 10000 = 1Gb
};

const getUserImage = async (req, res) => {
  let { token } = req.headers;
  let userInfo = decodeToken(token);
  let { user_id } = userInfo.data.checkEmail;

  try {
    let data = await prisma.images.findMany({
      where: {
        user_id: Number(user_id),
      },
    });
    res.send(data);
  } catch (e) {
    res.send(e);
  }
};

const getUserBookmark = async (req, res) => {
  let { token } = req.headers;
  let userInfo = decodeToken(token);
  let { user_id } = userInfo.data.checkEmail;

  try {
    let data = await prisma.images_bookmark.findMany({
      where: {
        user_id: user_id,
      },
      include: {
        images: true,
        users: {
          select: {
            user_id: true,
            user_name: true,
            user_email: true,
          },
        },
      },
    });
    res.send(data);
  } catch (e) {
    res.send(`An error as occurred, Err: ${e}`);
  }
};

const getCurrentUser = async (req, res) => {
  let { token } = req.headers;
  let userInfo = decodeToken(token);
  let { user_id } = userInfo.data.checkEmail;

  try {
    let data = await prisma.users.findUnique({
      where: {
        user_id: user_id,
      },
    });

    let userBookmarks = await prisma.images_bookmark.findMany({
      where: {
        user_id: user_id,
      },
      include: {
        images: true,
      },
    });

    let userImages = await prisma.images.findMany({
      where: {
        user_id: user_id,
      },
    });
    res.send({
      info: data,
      images: userImages,
      bookmarks: userBookmarks,
    });
  } catch (e) {
    res.send(`An error as occurred, Err: ${e}`);
  }
};

const removeUserImage = async (req,res) =>{
  let { token } = req.headers;
  let userInfo = decodeToken(token);
  let { user_id } = userInfo.data.checkEmail;

  let {image_id} = req.body;
  
  try{
    // Tháo ảnh khỏi bookmark
    await prisma.images_bookmark.deleteMany({
      where:{
        image_id: image_id
      }
    })
    // Tháo comment
    await prisma.images_comment.deleteMany({
      where:{
        image_id: image_id
      }
    })

    await prisma.images.delete({
      where:{
        user_id: user_id,
        image_id: image_id
      }
    })

    res.send("remove completed")
  }catch(e){
    res.send(e)
  }

}

export {
  userLogin,
  userSignUp,
  userLoginFacebook,
  updateInfo,
  userGetInfoById,
  getUserImage,
  getUserBookmark,
  getCurrentUser,
  removeUserImage,
};
