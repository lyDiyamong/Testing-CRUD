const Users = require("../Models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { Genders, Payments } = require("../Models");


exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await Users.findAll({
        // attributes : ['firstName', "lastName"]
        include : [{model : Genders, as : 'Gender'}]
    });

    res.status(200).json({
        status: "success",
        data: {
            users,
        },
    });
});
exports.createUser = async (req, res, next) => {
    const user = req.body;
    if (Object.keys(user).length === 0) {
        return next(new AppError("You can't create with empty field", 400));
    }

    // // Check if a user with the same data already exists
    // const existingUser = await User.findOne({
    //     where: { email: user.email },
    // });
    // if (existingUser) {
    //     return next(new AppError("User already existed", 400));
    // }

    // If no user exists, create a new one
    const newUser = await Users.create(user);
    return res.status(200).json({
        status: "success",
        newUser,
    });
};

exports.getUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await Users.findByPk(id);

    if (!user) {
        return next(new AppError("There is no user with this id", 404));
    }

    return res.status(200).json({
        status: "succes",
        user,
    });
});

exports.deleteUser = async (req, res, next) => {
    const { id } = req.param;
    const user = await Users.findByPk(id);

    if (!user) {
        return next(
            new AppError("Can't Delete! There is no user with this id", 404)
        );
    }

    await User.destroy({
        where: {
            id: req.params.id,
        },
    });

    res.status(204).json({
        status: "success",
    });
};

exports.updateUser = async (req, res, next) => {
    const { id } = req.params;
    // const user = await User.findByPk(id);

    // if (!user) {
    //     return res.status(404).json({
    //         status: "fail",
    //         message: "Can't delete! There no user with this id.",
    //     });
    // }

    // await User.update({
    //     req.body,
    //     where: {
    //         id: req.params.id,
    //     },
    // });
    /*
        ! must destructure cuz update method return an array  */
    const [updatedUser] = await Users.update(
        {
            name: req.body.name,
            email: req.body.email,
        },
        {
            where: { id },
            validate: true, // This option triggers validation
            // returning: true, // To return the updated rows (useful in PostgreSQL)
            individualHooks: true, // This ensures that hooks like `beforeUpdate` and `afterUpdate` run for each record
        }
    );
    console.log(updatedUser);
    // console.log(updatedUser);
    const user = await Users.findByPk(updatedUser);

    res.status(201).json({
        status: "success",
        user,
    });
};

// Gpt version

exports.updateUser = async (req, res, next) => {
    const { id } = req.params;

    // Check if user exists
    const user = await Users.findByPk(id);
    if (!user) {
        // return res.status(404).json({
        //     status: "fail",
        //     message: "Can't update! No user found with this ID.",
        // });
        return next(new AppError("Can't update! No user found with this ID"));
    }

    // Check if request body is empty
    if (Object.keys(req.body).length === 0) {
        // return res.status(400).json({
        //     status: "fail",
        //     message: "Nothing to update. Please provide valid data.",
        // });
        return next(
            new AppError("Nothing to update. Please provide valid data.", 400)
        );
    }

    // Update user with validation
    await User.update(req.body, {
        where: { id },
        validate: true,
        individualHooks: true,
    });

    // Fetch the updated user
    const updatedUser = await Users.findByPk(id);

    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser,
        },
    });
};
