import express from 'express';
import { createMedication, getMedications } from '../controllers/medication';

const router = express.Router();

// Define API endpoints
router.post('/medications', createMedication);

router.get('/medications', getMedications);

export default router;
