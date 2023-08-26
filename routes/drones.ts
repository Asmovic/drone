import express from 'express';
import { body } from 'express-validator';
import { DroneModelEnum, DroneState } from '../models/drone2';

import {
  availableDrones,
  batteryLevel,
  createDrone,
  droneContent,
  getDrones,
  load,
  updateDrone,
} from '../controllers/drone';

const router = express.Router();

// Define API endpoints
router.post(
  '/drones',
  [
    body('serialNumber')
      .notEmpty()
      .isLength({
        min: 1,
        max: 100,
      })
      .withMessage(
        'Serial number must be provided and not greater than 100 characters.'
      ),
    body('weightLimit')
      .notEmpty()
      .isInt({ max: 500 })
      .withMessage('WeightLimit cannot be greater than 500'),
    body('batteryCapacity')
      .notEmpty()
      .isFloat({ min: 0, max: 100 })
      .withMessage('Battery capacity cannot be greater than 100'),
    body('model')
      .notEmpty()
      .withMessage('Model is required')
      .isIn(Object.values(DroneModelEnum))
      .withMessage('Invalid model value'),
    body('state')
      .notEmpty()
      .withMessage('State is required')
      .isIn(Object.values(DroneState))
      .withMessage('Invalid state value'),
  ],
  createDrone
);

router.get('/drones', getDrones);

router.get('/drones/available', availableDrones);

router.get('/drones/:serialNumber/battery', batteryLevel);

router.post('/drones/:serialNumber/load', load);

router.get('/drones/:serialNumber', droneContent);

router.patch('/drones/:pk', updateDrone);

export default router;
