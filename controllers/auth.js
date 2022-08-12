import User from '../models/UserModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username,
            email,
            password,
        });
        res.status(201).json({
            success: true,
            user,
        });
        sendToken(user, 200, res);
        console.log(user);
    } catch (error) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    //check if email & password is provided
    if (!email, !password) {
        return next(new ErrorResponse("Plese Provide and email & password", 400));
    }

    try {
        //check that user exist by email
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        //check that password match
        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        sendToken(user, 200, res);
        const token = user.getSignedJwtToken();
        console.log({
            email: email,
            token: token
        });

    } catch (error) {
        next(err);
    }
};

export function logout(req, res, next) {
    console.log('Logout Route');
    res.send('Logout Route');
}

export function forgotPassword(req, res, next) {
    console.log('Forgot Password Route');
    res.send('Forgot Password Route');
}

export function resetPassword(req, res, next) {
    console.log('Reset Password Route');
    res.send('Reset Password Route');
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ 
        sucess: true, 
        token });
  };

