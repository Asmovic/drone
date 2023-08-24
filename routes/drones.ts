import express, { Request, Response } from 'express';
import Drone from '../models/drone';

const router = express.Router();

router.post('/drones', async (req, res) => {
  try {
    const newDrone = req.body;
    const drone = await Drone.create(newDrone);
    res.status(201).json({ message: 'Drone registered successfully', drone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register drone' });
  }
});

// Define API endpoints
router.post('/drones', async (req: Request, res: Response) => {
  const newDrone = req.body;
  try {
    console.log('new drone', newDrone);
    const drone = await Drone.create(newDrone);
    res.status(201).json({ message: 'Drone registered successfully', drone });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register drone' });
  }
});

router.get('/drones', async (req: Request, res: Response) => {
  const drones = await Drone.findAll();
  res.send(drones);
});

// Implement other endpoints similarly
/* app.post('/drones', (req, res) => {
  const newDrone: Drone = req.body;
  drones.push(newDrone);
  res.status(201).json({ message: 'Drone registered successfully' });
});

app.post('/drones/:serialNumber/load', (req, res) => {
  const serialNumber = req.params.serialNumber;
  const medications: Medication[] = req.body;
  loadedMedications[serialNumber] = medications;
  res.status(200).json({ message: 'Medications loaded successfully' });
});

app.get('/drones/:serialNumber/loaded', (req, res) => {
  const serialNumber = req.params.serialNumber;
  const medications = loadedMedications[serialNumber] || [];
  res.status(200).json(medications);
});

app.get('/drones/available', (req, res) => {
  const availableDrones = drones.filter(drone => drone.state === 'IDLE');
  res.status(200).json(availableDrones);
});

app.get('/drones/:serialNumber/battery', (req, res) => {
  const serialNumber = req.params.serialNumber;
  const drone = drones.find(drone => drone.serialNumber === serialNumber);
  if (drone) {
    res.status(200).json({ batteryCapacity: drone.batteryCapacity });
  } else {
    res.status(404).json({ message: 'Drone not found' });
  }
}); */

export default router;
