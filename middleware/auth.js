import jwt from 'jsonwebtoken';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/UserModel.js';

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.header.authorization.startWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorResponse("Not authorize to access this route", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new ErrorResponse("No user found with this id", 404));
        }

        req.user = user;
    } catch (error) {
        return next(new ErrorResponse("Not authorize to access this route", 401));
    }
};

export default protect;