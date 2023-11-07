// quản lý API
// quản lý chức năng của đối tượng

import express from "express";

const imageRoute = express.Router();

import {
  getImage,
  createImage,
  getImageId,
  commentImage,
  findImage,
} from "../controllers/imageController.js";
import { khoaApi } from "../config/jwt.js";
import { upload } from "../controllers/uploadController.js";
// ORM: sequelize, prisma
// localhost:8080/api/image/get-image
imageRoute.get("/get-image", getImage);


// localhost:8080/api/image/get-image-id/{imageId}
imageRoute.get("/:imageId", getImageId);

// localhost:8080/api/image/find
imageRoute.post("/find", findImage);
// // API chức năng like
// imageRoute.post("/like", likeImage);

// API chức năng upload ảnh
// localhost:8080/api/image/upload-image (USER LOGIN REQUIRED)
imageRoute.post("/upload-image", khoaApi, upload.single("file"), createImage);

// API chức năng comment
// localhost:8080/api/image/upload-comment (USER LOGIN REQUIRED)
imageRoute.post("/upload-comment", khoaApi, commentImage);
export default imageRoute;
