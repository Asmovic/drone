import express, { Request, Response } from 'express';
import Medication from '../models/medication';

const router = express.Router();

// Define API endpoints
router.post('/medications', async (req: Request, res: Response) => {
  const newMedication = req.body;

  try {
    console.log('new medication', newMedication);
    const medication = await Medication.create(newMedication);
    res
      .status(201)
      .json({ message: 'Medication created successfully', medication });
  } catch (error: any) {
    res.status(500).json({
      errorMsg: error.message,
      error: error.errors,
    });
  }
});

router.get('/medications', async (req: Request, res: Response) => {
  const medications = await Medication.findAll();
  res.send(medications);
});

export default router;
