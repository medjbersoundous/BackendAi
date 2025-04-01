import express from 'express';
import { predictRecovery } from '../controllers/predictController.js';
const predictRouter = express.Router();
predictRouter.post('/predict', predictRecovery);
export default predictRouter;
