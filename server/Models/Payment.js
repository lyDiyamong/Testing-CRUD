const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Payment = sequelize.define("Payments", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount : {
        type : DataTypes.DECIMAL,
        allowNull : false,
        validate : {
            notNull : {
                msg : "Amount is required"
            },
            isDecimal : {
                msg: "Amount must be a decimal value"
            },
            min : {
                args : [0],
                msg : "Amount must be greater than or equal to 0"
            }
        }
    },
    status : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false,
        validate : {
            notNull : {
                msg : "Payment status is required"
            },
            isIn : {
                args : [[true, false]],
                msg : "Status must be either true (after paying) or false (before paying)"
            }
        }
    },
    paymentDate : {
        type : DataTypes.DATE,
        allowNull : false,
        validate : {
            notNull : {
                msg : "Payment date is required"
            },
            isDate : {
                msg : "Date is not correctly format"
            }
        }
    },
    paymentMethod : {
        type : DataTypes.STRING,
        validate : {
            isIn : {
                args : [['visa', 'mastercard']],
                msg : "Payment method must be either visa or mastercard"
            }
        }
    },
    subscriptionId : {
        type: DataTypes.INTEGER,
        references : {
            model : "Subscriptions",
            key : "id"
        }
    }

})

module.exports = Payment