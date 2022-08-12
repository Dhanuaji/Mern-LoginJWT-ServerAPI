import ErrorResponse from "../utils/ErrorResponse.js";

const ErrorHandler = (err, req, res, next) => {
    let error = {...err};

    error.message = err.message;

    if(err.code === 110000) {
        const message = `Duplicate Field Value entered`;
        error = new ErrorResponse(message, 400);
    }

    if(err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    console.log(error.message);

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    });
};

export default ErrorHandler;