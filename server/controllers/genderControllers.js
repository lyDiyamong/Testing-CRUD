const Genders = require("../Models/Gender");
const BaseController = require("../utils/baseControllers");

class GenderController extends BaseController {
    constructor() {
        super(Genders); // Pass the specific model (Gender) to the BaseController
    }

    // Add custom logic for Order if necessary
}

module.exports = new GenderController();
