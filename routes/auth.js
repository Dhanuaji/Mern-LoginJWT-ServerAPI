import express from 'express';
import { register, login, logout, forgotPassword, resetPassword } from '../controllers/auth.js';

const route = express.Router();

route.post('/login', login);
route.post('/register', register);
route.post('/logout', logout);
route.post('/forgot-password', forgotPassword);
route.post('/reset-password/:resetToken', resetPassword);

export default route;