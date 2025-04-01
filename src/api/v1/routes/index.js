import express from 'express';
import AuthRouter from './AuthRoute.js';
import predictRouter from './predictRoute.js';
const router = express.Router();
router.use('/auth', AuthRouter);
router.use('/ml', predictRouter);
export default router;
