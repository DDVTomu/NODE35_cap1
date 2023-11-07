// quản lý API
// quản lý chức năng của đối tượng

import express from "express";

const bookmarkRoute = express.Router();

import {
  addBookmark,
  getAllBookmarks,
} from "../controllers/bookmarkController.js";
import { khoaApi } from "../config/jwt.js";

// ORM: sequelize, prisma
// API chức năng lưu / bookmark ảnh
// localhost:8080/api/bookmark/save (USER LOGIN REQUIRED)
bookmarkRoute.post("/save", khoaApi, addBookmark);

//get all bookmarked images
// API chức năng lấy tất cả
// localhost:8080/api/bookmark/save (USER LOGIN REQUIRED)
bookmarkRoute.get("/get-all", getAllBookmarks);

export default bookmarkRoute;
