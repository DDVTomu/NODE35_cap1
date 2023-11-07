import { decodeToken } from "../config/jwt.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { PrismaClient } from "@prisma/client";

let model = initModels(sequelize);
let prisma = new PrismaClient();

const getImage = async (req, res) => {
  // SELECT * FROM Image;
  //   let data = await model.images.findAll();
  let data = await prisma.images.findMany();

  res.send(data);
};

const createImage = async (req, res) => {
  let file = req.file;

  let { image_name, image_desc } = req.body;
  let { token } = req.headers;
  let userInfo = decodeToken(token);
  let { user_id } = userInfo.data.checkEmail;

  try {
    if (!file) {
      res.send("Please choose an image to upload");
    } else {
      let filename = `/public/uploads/${file.filename}`;
      await prisma.images.create({
        data: {
          image_name,
          image_src: filename,
          user_id,
          image_desc,
        },
      });

      res.send("Upload successful");
    }
  } catch (e) {
    res.send(`Upload unsuccessful, err:${e}`);
  }
};

const getImageId = async (req, res) => {
  let { imageId } = req.params;

  let user_id = "";

  let { token } = req.headers;
  if (token) {
    let userInfo = decodeToken(token);
    user_id = userInfo.data.checkEmail.user_id;
  }

  try {
    let data = await prisma.images.findUnique({
      where: {
        image_id: Number(imageId),
      },
      include: {
        users: {
          select: {
            user_id: true,
            user_name: true,
            user_email: true,
          },
        },
      },
    });

    let comments = await prisma.images_comment.findMany({
      where: {
        image_id: Number(imageId),
      },
      include: {
        users: {
          select: {
            user_id: true,
            user_name: true,
            user_email: true,
          },
        },
      },
    });
    let commentCount = comments.length;

    let saveCheck = [];

    if (!user_id) {
      saveCheck = "Please login to bookmark this image";
    } else {
      let bookmark = await prisma.images_bookmark.findMany({
        where: {
          image_id: Number(imageId),
          user_id: Number(user_id),
        },
      });

      let checkArray =
        Array.isArray(bookmark) && bookmark.length ? true : false;

      switch (checkArray) {
        case false:
          saveCheck = "Not save";
          break;
        case true:
          saveCheck = "User Saved";
          break;
      }
    }

    let dataComment = {
      comments,
      count: commentCount,
    };
    res.send({
      data,
      dataComment,
      dataBookmark: {
        check: saveCheck,
      },
    });
  } catch (e) {
    res.send(`an error has occurred, err:${e}`);
  }
};

const findImage = async (req, res) => {
  let { input } = req.body;

  try {
    let data = await prisma.images.findMany({
      where: {
        image_name: {
          contains: input,
        },
      },
    });

    //case sensitive addition
    const caseSensitiveResults = data.filter((image) =>
      image.image_name.includes(input)
    );

    res.send(caseSensitiveResults);
  } catch (e) {
    res.send(`an error has occurred, err:${e}`);
  }
};

const likeImage = async (req, res) => {
  let { ImageId } = req.body;
  let { token } = req.headers;

  let userInfo = decodeToken(token);
  let { user_id } = userInfo.data.checkEmail;

  let checkLike = await model.Image_like.findAll({
    where: {
      user_id: user_id,
      Image_id: ImageId,
    },
  });

  if (checkLike.length == 0) {
    let newData = {
      Image_id: ImageId,
      user_id: user_id,
      date_create: new Date(),
      dis_like: 0,
    };
    await model.Image_like.create(newData);
  } else {
  }

  res.send(true);
};

const commentImage = async (req, res) => {
  let { image_id, comment } = req.body;
  let { token } = req.headers;

  let userInfo = decodeToken(token);
  let { user_id } = userInfo.data.checkEmail;

  let newData = {
    image_id,
    user_id,
    comment,
    date_created: new Date(),
    timestamp: new Date(),
  };

  try {
    await prisma.images_comment.create({ data: newData });
  } catch (e) {
    res.send(`An error as occurred, Err: ${e}`);
  }

  res.send("your comment has been uploaded");
};

export {
  getImage,
  createImage,
  getImageId,
  commentImage,
  findImage,
};
