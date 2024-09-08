const Users = require("../Models/User");
const BaseController = require("../utils/baseControllers");

const userControllers = new BaseController(Users)

module.exports = userControllers