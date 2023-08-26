import BatteryLog from '../models/batteryLog';
import cron from 'node-cron';
import { sequelize } from '../database';
import Drone from '../models/drone2';

sequelize.sync();

// Hourly cron expression ---> 0 * * * *
// Every minute cron expression ---> * * * * *

// Schedule the task to run every minute
cron.schedule('* * * * *', async () => {
  try {
    const drones = await Drone.findAll(); // Fetch all drones

    // Iterate through drones and check battery levels
    for (const drone of drones) {
      // Create a battery log entry
      await BatteryLog.create({
        droneSerialNumber: drone.serialNumber,
        batteryLevel: drone.batteryCapacity,
        createdAt: new Date(),
      });
    }

    console.log('Battery checks and logs created.');
  } catch (error) {
    console.error('Error in battery check task:', error);
  }
});

console.log('Battery check task scheduled.');
