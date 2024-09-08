const { DataTypes } = require("sequelize");
const sequelize = require('../config/database')

const Genders = sequelize.define('Genders', {
    id: {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
    },

    name : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            isIn : {
                args :[['Male', "Female"]],
                msg : "Gender must be either Male or Female"
            }
        }
    },

},{
    timestamps : false
})

module.exports = Genders;
