const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Institutions = sequelize.define("Institutions", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: ["^[a-z\\s]+$", "i"], // value can't be numeric
            notEmpty: {
                msg: "Your Institution name can't be empty",
            },
        },
    },
    bio: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Your email is not correctly format",
            },
        },
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: {
                msg: "Phone number can't have characters inside them",
            },
            len: { args: [9, 10], msg : "Phone number must be between 9 - 10 digits" },
            notEmpty: {
                msg: "Phone number cannot be empty.",
            },
        },
    },
    websiteUrl : {
        type : DataTypes.STRING,
        validate : {
            isUrl : {
                msg : "Please provide a valid URL"
            }
        }
    },
    profileImage: {
        type: DataTypes.STRING,
    },
});

// const haha = async function() {
//     await Institutions.create({phoneNumber : "123456789", email : "hahah@gmail.com", name : "nono"})
// }
// haha()
module.exports = Institutions;
