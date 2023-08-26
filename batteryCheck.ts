/* import Drone from './models/drone'; */
import BatteryLog from './models/batteryLog';

export const startBatteryCheck = () => {
  /* setInterval(async () => {
    const drones = await Drone.findAll();
    for (const drone of drones) {
      if (drone.batteryCapacity < 25) {
        drone.state = 'RETURNING';
        await drone.save();
      }
      // Log battery level history
      await BatteryLog.create({
        droneSerialNumber: drone.serialNumber,
        batteryCapacity: drone.batteryCapacity,
        timestamp: new Date(),
      });
    }
  }, 60000); */
  // Check every 60 seconds
};
