import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

class BatteryLog extends Model {}

BatteryLog.init(
  {
    droneSerialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batteryLevel: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BatteryLog',
  }
);

export default BatteryLog;
