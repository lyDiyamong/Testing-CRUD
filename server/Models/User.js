const { DataTypes } = require("sequelize");
const sequelize = require('../config/database')

const Users = sequelize.define('Users', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    firstName : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    lastName : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type: DataTypes.STRING,
        allowNull : false,
        validate : {
            isEmail : {
                msg : "Email is invalid format"
            }
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Roles',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    genderId: {
        type: DataTypes.INTEGER,
        references : {
            model : "Genders",
            key : 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
},

{
    indexes: [{
        unique : true,
        fields : ["email"]
    }]
})

module.exports = Users