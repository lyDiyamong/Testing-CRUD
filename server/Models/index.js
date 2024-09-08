const Users = require("./User");
const Roles = require("./Role");
const Addresses = require("./Address");
const Genders = require("./Gender");
const Institutions = require("./Institution");
const Payments = require("./Payment");
const Subscriptions = require("./Subscription");
const ServicePlans = require("./SevicePlan");

/*
 * User & Role  */
Users.belongsTo(Roles, {
    foreignKey: "roleId",
});
Roles.hasOne(Users, {
    foreignKey: "roleId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

/*
 * Address & User */
Users.hasMany(Addresses, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Addresses.belongsTo(Users, {
    foreignKey: "userId",
});

/*
 * User & Gender */
Users.belongsTo(Genders, {
    foreignKey: "genderId",
});
Genders.hasMany(Users, {
    foreignKey: "genderId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

/*
 * Institutions & Subscriptions */
Subscriptions.belongsTo(Institutions, {
    foreignKey: "institutionId",
});
Institutions.hasMany(Subscriptions, {
    foreignKey: "institutionId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
/*
 * Subscriptions & ServicePlans */
Subscriptions.belongsTo(ServicePlans, {
    foreignKey: "servicePlanId",
});
ServicePlans.hasMany(Subscriptions, {
    foreignKey: "servicePlanId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
/*
 * Payments & Subscriptions */
Payments.belongsTo(Subscriptions, {
    foreignKey: "subscriptionId",
});
Subscriptions.hasMany(Payments, {
    foreignKey: "subscriptionId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = {
    Users,
    Roles,
    Addresses,
    Genders,
    Payments,
    Subscriptions,
    ServicePlans,
};
