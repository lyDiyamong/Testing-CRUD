const { DataTypes } = require("sequelize");
const sequelize = require('../config/database')

const Roles = sequelize.define('Roles', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        validate :{
            isIn : {
                args : [['admin', 'institution', 'issuer', 'admin']],
                msg  : "The roles must be in admin, institution, issuer, admin"
            }
        }
    }
})

module.exports = Roles