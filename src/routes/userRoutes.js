import express from "express";
import {
  updateInfo,
  uploadAvatar,
  userLogin,
  userSignUp,
  userGetInfoById,
  getUserImage,
  getUserBookmark,
  getCurrentUser,
  removeUserImage,
} from "../controllers/userController.js";
import { upload } from "../controllers/uploadController.js";

import { khoaApi } from "../config/jwt.js";

const userRoute = express.Router();

// signUp
// API chức năng đăng ký
// localhost:8080/api/user/sign-up
userRoute.post("/sign-up", userSignUp);

// login
// API chức năng đăng nhập
// localhost:8080/api/user/sign-up
userRoute.post("/login", userLogin);

// API chức năng cập nhật user
// localhost:8080/api/user/update-info (USER LOGIN REQUIRED)
userRoute.put("/update-info", khoaApi, updateInfo);

userRoute.put("/update-avatar", upload.single("file"), uploadAvatar);

userRoute.post("/get-user", userGetInfoById);

// localhost:8080/api/image/my-images
userRoute.get("/my-info", khoaApi, getCurrentUser);

// localhost:8080/api/image/my-images
userRoute.get("/my-images", khoaApi, getUserImage);

// localhost:8080/api/image/my-bookmark
userRoute.get("/my-bookmark", khoaApi, getUserBookmark);

// localhost:8080/api/image/my-bookmark
userRoute.delete("/remove-img", khoaApi, removeUserImage);

export default userRoute;
