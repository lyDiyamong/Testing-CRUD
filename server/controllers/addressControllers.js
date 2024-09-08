

const { Addresses, Users } = require("../Models");
const BaseController = require("../utils/baseControllers");
const catchAsync = require("../utils/catchAsync");

class AddressController extends BaseController {
    constructor() {
        super(Addresses);
    }

    // Overriding the getAll method to include related Users
    getAll = catchAsync(async (req, res, next) => {
        const addresses = await Addresses.findAll({
            include: [{ model: Users }]
        });

        // Return the response to the client
        res.status(200).json({
            status: 'success',
            data: addresses
        });
    });
};

module.exports = new AddressController

