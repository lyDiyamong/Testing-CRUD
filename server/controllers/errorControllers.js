const { Sequelize } = require("sequelize");
const AppError = require("../utils/appError");

// Error handling functions
const handleForeignKeyConstraintError = (err) => {
    const message = `Invalid reference: The related record with ${err.fields} '${err.value}' does not exist.`;
    return new AppError(message, 400);
};

const handleUniqueConstraintError = (err) => {
    const field = Object.keys(err.fields)[0]; // Get the field name that caused the error
    const value = err.fields[field]; // Get the value of the field
    const message = `Duplicate entry: '${value}' for field '${field}' already exists. Please use a different value.`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
};

// Development Error Handler
const sendErrorDev = (err, req, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

// Production Error Handler
const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith("/api")) {
        // API responses
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
        // Programming or other unknown error
        console.error("ERROR 💥", err);
        return res.status(500).json({
            status: "error",
            message: "Something went very wrong!",
        });
    } else {
        // Rendered website responses
        if (err.isOperational) {
            return res.status(err.statusCode).render("error", {
                title: "Something went wrong!",
                msg: err.message,
            });
        }
        console.error("ERROR 💥", err);
        return res.status(err.statusCode).render("error", {
            title: "Something went wrong!",
            msg: "Please try again later.",
        });
    }
};

// Centralized Error Middleware
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    // Handle errors based on environment
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === "production") {
        let error = Object.create(err);

        // Handle specific Sequelize errors
        if (error instanceof Sequelize.ForeignKeyConstraintError) {
            error = handleForeignKeyConstraintError(err);
        }
        if (err instanceof Sequelize.UniqueConstraintError) {
            error = handleUniqueConstraintError(err);
        }
        if (error.name === "SequelizeValidationError") {
            error = handleValidationErrorDB(error);
        }
        if (error instanceof Sequelize.DatabaseError) {
            // Handle any other database error
            const message =
                "Database operation failed. Please check your input and try again.";
            error = new AppError(message, 400);
        }

        sendErrorProd(error, req, res);
    }
};
