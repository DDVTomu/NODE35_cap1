import { Sequelize } from "sequelize";
import config from '../config/config.js';

const sequelize = new Sequelize(
    config.database, config.userName, config.pass,
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect
    });

export default sequelize;

// => Database First => kéo tất table của database về code => tự tạo model (DAO)
// yarn add sequelize-auto

//  yarn sequelize-auto -h localhost -d db_youtube -u root -x 1234 -p 3306 --dialect mysql -o ./src/models -l esm