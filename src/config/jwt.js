// yarn add jsonwebtoken
import jwt from "jsonwebtoken";

// tạo token mã hóa data
const createToken = (data) => {
  // HS256
  let token = jwt.sign({ data }, "NODE35", { expiresIn: "5y" });
  return token;
};

// kiểm tra token hợp lệ hay không
const checkToken = (token) => {
  return jwt.verify(token, "NODE35");
};

// giải mã token
const decodeToken = (token) => {
  return jwt.decode(token);
};

const khoaApi = (req, res, next) => {
  try {
    let { token } = req.headers;
    checkToken(token);
    next();
  } catch (exception) {
    res.status(401).send("Không có quyền truy cập !");
  }
};

export { createToken, checkToken, decodeToken, khoaApi };
