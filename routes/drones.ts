import express, { Request, Response } from 'express';
import { body, check, validationResult } from 'express-validator';
import Drone, { DroneModelEnum, DroneState } from '../models/drone2';
import Medication from '../models/medication';
import { sequelize } from '../database';

const router = express.Router();

/* router.post('/dronexx', async (req, res) => {
  try {
    const newDrone = req.body;
    const drone = await Drone.create(newDrone);
    res.status(201).json({ message: 'Drone registered successfully', drone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register drone' });
  }
}); */

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
  async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newDrone = req.body;
    try {
      console.log('new drone', newDrone);
      const drone = Drone.build(newDrone);
      await drone.save();
      res
        .status(201)
        .json({ message: 'Drone registered successfully', data: drone });
    } catch (error: any) {
      console.log('error....', error);
      res.status(500).json({
        errorMsg: error.message,
        error: error.errors,
      });
    }
  }
);

router.get('/drones', async (req: Request, res: Response) => {
  const drones = await Drone.findAll();
  console.log(
    'nested...',
    Object.values(drones[0].toJSON().loadedMedicationsId)
  );
  res.send({
    resultLength: drones.length,
    message: 'Drone records retrieved successfully!!!',
    data: drones,
  });
});

router.get('/drones/available', async (req, res) => {
  const drones = await Drone.findAll();
  const availableDrones = drones.filter((drone) => drone.state === 'IDLE');
  res.status(200).json({
    resultLength: availableDrones.length,
    message: 'Available Drone retrieved successfully!!!',
    data: availableDrones,
  });
});

router.get('/drones/:serialNumber/battery', async (req, res) => {
  const serialNumber = req.params.serialNumber;
  const drone = await Drone.findByPk(serialNumber);
  if (drone) {
    res.status(200).json({
      message: 'Drone Battery Capacity retrieved successfully!!!',
      data: {
        batteryCapacity: drone.batteryCapacity,
      },
    });
  } else {
    res.status(404).json({ message: 'Drone not found' });
  }
});

router.post('/drones/:serialNumber/load', async (req, res) => {
  const serialNumber = req.params.serialNumber;
  const ids: number[] = req.body.medicationIds;

  try {
    const response = await loadMedicationsOnDrone(serialNumber, ids);
    console.log('loaded...', response);
    res
      .status(response!.code)
      .send({ data: { loaded: response!.loaded, message: response!.message } });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

router.get('/drones/:serialNumber', async (req, res) => {
  const serialNumber = req.params.serialNumber;
  try {
    const drone = (await Drone.findByPk(serialNumber)) as any;

    console.log('Drone to be loaded.', drone);

    if (!drone) {
      console.log('Drone not found.');
      throw new Error('Drone not found.');
    }

    const medications = await Medication.findAll({
      where: {
        id: JSON.parse(drone.dataValues.loadedMedicationsId),
      },
    });

    if (medications.length === 0) {
      console.log('No medications found.');
      return;
    }

    console.log(
      'Medications loaded on drone',
      medications.map((med) => med.toJSON())
    );
    res.send({
      message: 'Items loaded on drone retrieved successfully!!!',
      data: {
        ...drone.dataValues,
        loadedItems: medications.map((med) => med.toJSON()),
      },
    });
  } catch (error) {
    console.error('Error loading medications:', error);
  }
});

router.patch('/drones/:serialNumber', async (req, res) => {
  const serialNumber = req.params.serialNumber;
  const ids: number[] = req.body.medicationIds;

  console.log('load dep...', serialNumber, ids);
  try {
    await updateDrone(serialNumber, { loadedMedicationsId: ids });
    res.send({ message: 'Drone updated successfully!!!' });
  } catch (error) {
    return res.status(404).json({ message: 'Error loading Drone' });
  }
});

async function loadMedicationsOnDrone(droneId: any, medicationIds: number[]) {
  let status;
  try {
    const drone = (await Drone.findByPk(droneId)) as any;

    console.log('Drone to be loaded.', drone);

    if (!drone) {
      console.log('Drone not found.');
      return (status = {
        loaded: false,
        code: 404,
        message: 'Drone not found.',
      });
      /* throw new Error('Drone not found.'); */
    }

    if (drone.batteryCapacity < 25) {
      console.log('Drone not found.');
      return (status = {
        loaded: false,
        code: 400,
        message:
          "Sorry!!! Drone Battery Capacity is below 25%. Hence, you can't load this Drone.",
      });
    }

    const medications = await Medication.findAll({
      where: {
        id: medicationIds,
      },
    });

    if (medications.length === 0) {
      console.log('No medications found.');
      return (status = {
        loaded: false,
        code: 404,
        message: 'No medications found.',
      });
    }
    const result = await medications
      .map((med: any) => med.dataValues.id)
      .filter((item) => item !== undefined);

    const totalWeight = medications.reduce((a, b) => a + b.weight, 0);
    const weightLimit = drone.dataValues.weightLimit;

    if (totalWeight > weightLimit) {
      return (status = {
        loaded: false,
        code: 400,
        message:
          'Attention!!! Drone is overloaded. The Weight Limit for this Drone is: ' +
          weightLimit,
      });
      /*       throw new Error(
        'Attention!!! Drone is overloaded. The Weight Limit for this Drone is: ' +
          weightLimit
      ); */
    }

    console.log('result...', result, totalWeight, weightLimit);

    /*     console.log(
      'Medications loaded on drone:',
      medications.map((med) => med.toJSON())
    ); */
    await drone.update({ loadedMedicationsId: JSON.stringify(result) });
    return (status = {
      loaded: true,
      code: 200,
      message: 'Drone loaded successfully!!!',
    });
  } catch (error) {
    console.error('Error loading medications:', error);
  }
}

async function updateDrone(serialNumber: string, newData: any) {
  try {
    const drone = await Drone.findByPk(serialNumber);
    if (!drone) {
      console.log('Drone not found.');
      return;
    }
    await drone.update(newData);
    console.log('Drone updated:', drone.toJSON().loadedMedicationsId);
  } catch (error) {
    console.error('Error updating drone:', error);
  }
}

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
 */

export default router;
