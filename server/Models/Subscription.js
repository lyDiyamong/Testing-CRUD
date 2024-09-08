const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Subscriptions = sequelize.define("Subscriptions", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isIn: {
                args: [[true, false]],
                msg: "Status must be either true (active) or false(inactive).",
            },
        },
    },
    startDate: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
            notNull: {
                msg: "Start data is required",
            },
            isDate: {
                msg: "Start Date must be in a date format",
            },
            isBeforeCurrentDate(value) {
                if (new Date(value) > new Date()) {
                    throw new Error("Start Date cannot be in the future.");
                }
            },
        },
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "End data is required",
            },
            isDate: {
                msg: "Start Date must be in a date format",
            },
            isAfterStartDate(value) {
                if (new Date(value) <= new Date(this.startDate)) {
                    throw new Error("End Date must be after the start date");
                }
            },
        },
    },
    institutionId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Institutions",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    servicePlanId : {
        type :DataTypes.INTEGER,
        references : {
            model : "ServicePlans",
            key : "id"
        }
    },
});

module.exports = Subscriptions;
