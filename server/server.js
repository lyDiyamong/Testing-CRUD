const app = require("./app");
// const globalErrorHandler = require('./controllers/errorController')
// const AppError = require("./utils/appError");
const sequelize = require("./config/database");
const dotenv = require("dotenv");
const models = require("./Models/index");

dotenv.config(".env");
console.log(process.env.NODE_ENV);

/*
 * Sync models with DB
 */
const syncDB = async () => {
    try {
        await sequelize.sync({ force: false, logging: false, alter: true });
        console.log("Database & tables created");
    } catch (error) {
        console.log("Database synce failed", error);
        process.exit(1); // Exit if database if sync fails
    }
};
syncDB();

// app.all('*', (req, res, next) => {
//     next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
//   });
// Coneenct to port
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
