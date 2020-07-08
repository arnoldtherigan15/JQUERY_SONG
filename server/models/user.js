'use strict';
const bcrypt = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(User){
        User.password = bcrypt.hashPassword(User.password)
      }
    }
  });
  return User;
};