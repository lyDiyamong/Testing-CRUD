const express = require("express");
const router = express.Router();
const AddressController = require('./../controllers/addressControllers')

router.route('/').get(AddressController.getAll).post(AddressController.createOne)

module.exports = router