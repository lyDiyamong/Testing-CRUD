const express = require("express");
const router = express.Router();
const AddressController = require("../controllers/genderControllers");

router.route("/").get(AddressController.getAll).post(AddressController.createOne);

router.route('/:id').delete(AddressController.deleteOne)

module.exports = router;
