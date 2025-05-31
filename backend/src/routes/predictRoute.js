import express from 'express';
import { handlePrediction } from '../controllers/predictController.js';

const router = express.Router();

router.post('/predict', handlePrediction);

export default router;
