"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    static associate(models) {}
  }
  Song.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "title is a required field",
          },
        },
      },
      artist: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "artist is a required field",
          },
        },
      },
      genre: DataTypes.STRING,
      url: {
        type: DataTypes.CHAR
      },
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};
