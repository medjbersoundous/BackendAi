import express from 'express';
import AuthRouter from './AuthRoute.js';
const router = express.Router();
router.use('/auth', AuthRouter);

export default router;
