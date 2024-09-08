module.exports = catchAsync = (inputFunction) => {
    return (req, res, next) => {
        inputFunction(req, res, next).catch(next);
    };
};
