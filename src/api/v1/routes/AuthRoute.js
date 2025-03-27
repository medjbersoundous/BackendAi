import express from 'express';
import { registerAthlete, loginAthlete, getAthleteInfo } from '../controllers/Auth.js';
import { protect } from '../middleswares/AuthMiddleware.js';
const AuthRouter = express.Router();
AuthRouter.post('/register', registerAthlete);
AuthRouter.post('/login', loginAthlete);
AuthRouter.get('/profile', protect, getAthleteInfo);
export default AuthRouter;
