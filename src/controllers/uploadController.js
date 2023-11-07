
// yarn add multer
import multer, { diskStorage } from 'multer';

// __dirname => node35/src/routes

export const upload = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/uploads", //  đường dẫn lưu tài nguyên (thư mục lưu trữ)
        filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
        // không trùng tên  1696598338484_meo.jpeg
        // nơi đổi tên tài nguyên
    })
});
