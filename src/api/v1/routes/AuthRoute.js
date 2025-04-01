import express from 'express';
import { registerAthlete, loginAthlete, getAthleteInfo } from '../controllers/Auth.js';
import { protect } from '../middleswares/AuthMiddleware.js';
import { verifyEmail } from '../controllers/verifyEmail.js';
const AuthRouter = express.Router();
AuthRouter.post('/register', registerAthlete);
AuthRouter.post('/login', loginAthlete);
AuthRouter.get('/profile', protect, getAthleteInfo);
AuthRouter.get('/verify', verifyEmail)
export default AuthRouter;
