import express from 'express';
const app = express();
app.use(express.json());
app.use(express.static(".")) // định vị lại đường dẫn để load tài nguyên ở BE

// yarn add cors
import cors from 'cors';
// mở chặn cho tất cả FE
app.use(cors())

app.listen(8080);

import rootRoute from './routes/rootRoutes.js';
app.use("/api", rootRoute);


// localhost:8080/api/video/get-video


// localhost:8080/api/user/get-user
// localhost:8080/api/product/get-product