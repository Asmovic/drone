import { Request, Response, NextFunction } from 'express';
import Medication from '../models/medication';

import { create, getAll, updateOne } from './handlerFactory';
import Drone from '../models/drone2';

export const getDrones = getAll(Drone);

export const createDrone = create(Drone);

export const updateDrone = updateOne(Drone);

export const availableDrones = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const drones = await Drone.findAll();
  const availableDrones = drones.filter((drone) => drone.state === 'IDLE');
  res.status(200).json({
    resultLength: availableDrones.length,
    message: 'Available Drone retrieved successfully!!!',
    data: availableDrones,
  });
};

export const batteryLevel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

export const load = async (req: Request, res: Response, next: NextFunction) => {
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
};

export const droneContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

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
      .filter((item: any) => item !== undefined);

    const totalWeight = medications.reduce(
      (a: number, b: any) => a + b.weight,
      0
    );
    const weightLimit = drone.dataValues.weightLimit;

    if (totalWeight > weightLimit) {
      return (status = {
        loaded: false,
        code: 400,
        message:
          'Attention!!! Drone is overloaded. The Weight Limit for this Drone is: ' +
          weightLimit,
      });
    }

    console.log('result...', result, totalWeight, weightLimit);

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
