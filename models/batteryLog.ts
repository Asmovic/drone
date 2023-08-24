import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

class BatteryLog extends Model {}

BatteryLog.init({
  droneSerialNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  batteryCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'BatteryLog',
});

export default BatteryLog;
