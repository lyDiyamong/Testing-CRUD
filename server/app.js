const express = require('express')
const userRouter = require('./routes/userRoute')
const genderRouter = require('./routes/genderRoute')
const addressRouter = require("././routes/addressRoute")
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorControllers')
const cors = require('cors') // for connecting to frontend

const app = express()

app.use(express.json())
app.use(cors())

/*
* Connect route */
app.use('/api/v1/users', userRouter)
app.use('/api/v1/genders', genderRouter)
app.use('/api/v1/addresses', addressRouter)


/*
! Use handle all the error, and not responding back in plain html
* '*' means all of the url
 */
app.all("*", (req, res, next) => {
    /*
    ! create an error
    * The string inside the constructor error will be an error message
     */
    // const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // err.status = "fail";
    // err.statusCode = 404;
    next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

/*
! Error handling with middleware
 */
app.use(globalErrorHandler);

module.exports = app