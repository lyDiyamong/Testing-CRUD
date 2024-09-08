const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ServicePlans = sequelize.define("ServicePlans", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull : false,
        validate: {
            isIn: {
                args: [
                    [
                        "Quarterly Quarter",
                        "Midyear Membership",
                        "Annual Advantage",
                    ],
                ],
                msg: "Plan must be QQ either MM either AA",
            },
            notNull: {
                msg: "servicePlan can't be empty",
            },
            is: ["^[a-z\\s]+$", "i"], // value can't be numeric
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull : false,
        validate: {
            notNull: {
                msg: "description can't be empty",
            },
        },
    },
    duration: {
        type: DataTypes.INTEGER,
        validate: {
            isNumeric: {
                msg: "Duration must be an Number",
            },
        },
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Service Plan price is required",
            },
            isDecimal: {
                msg: "Price must be an decimal",
            },
        },
    },
    badgeLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "badgeLimit must be an integer",
            },
        },
    },
    peopleLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "peopleLimit must be an integer",
            },
        },
    },
    isBadgeVerificationAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            isIn: [[true, false]],
        },
    },
    isBadgeBackpackFree: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            isIn: [[true, false]],
        },
    },
    isBadgeReportsAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            isIn: [[true, false]],
        },
    },
    isBadgeCertificatesAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            isIn: [[true, false]],
        },
    },
    technicalSupportType: {
        type: DataTypes.STRING,
    },
});

module.exports = ServicePlans