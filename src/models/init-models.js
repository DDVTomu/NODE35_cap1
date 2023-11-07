import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _images from  "./images.js";
import _images_comment from  "./images_comment.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const images = _images.init(sequelize, DataTypes);
  const images_comment = _images_comment.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  images_comment.belongsTo(images, { as: "image", foreignKey: "image_id"});
  images.hasMany(images_comment, { as: "images_comments", foreignKey: "image_id"});
  images.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(images, { as: "images", foreignKey: "user_id"});
  images_comment.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(images_comment, { as: "images_comments", foreignKey: "user_id"});

  return {
    images,
    images_comment,
    users,
  };
}
