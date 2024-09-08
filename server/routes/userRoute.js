const express = require("express");
const userControllers = require("../controllers/newUserControllers");
const addressController = require('./../controllers/addressControllers')
const router = express.Router();

router
    .route("/")
    .get(userControllers.getAll)
    .post(userControllers.createOne);

router
    .route("/:id")
    .get(userControllers.getOne)
    .delete(userControllers.deleteOne)
    .patch(userControllers.updateOne);

module.exports = router;
