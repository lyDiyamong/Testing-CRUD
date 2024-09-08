const { DataTypes } = require("sequelize");
const sequelize = require('../config/database')

const Addresses = sequelize.define('Address', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    street : {
        type : DataTypes.STRING,
        allowNull : false,
        // validate : {
        //     isAlpha: true
        // }
    },
    city : {
        type :DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
})

module.exports = Addresses