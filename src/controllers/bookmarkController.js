import { decodeToken } from "../config/jwt.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

const addBookmark = async (req, res) => {
  let { image_id } = req.body;

  let { token } = req.headers;
  let userInfo = decodeToken(token);
  let { user_id } = userInfo.data.checkEmail;

  try {
    await prisma.images_bookmark.create({
      data: {
        image_id,
        user_id,
        date_created: new Date(),
      },
    });
  } catch (e) {
    res.send(`An error as occurred, Err: ${e}`);
  }
  res.send(`Bookmarked`);
};

const getAllBookmarks = async (req, res) => {
  try {
    let data = await prisma.images_bookmark.findMany({
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

export { addBookmark, getAllBookmarks };
