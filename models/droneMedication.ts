import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

class DroneMedication extends Model {}

DroneMedication.init(
  {
    // No attributes needed, as this is just an association table
  },
  { sequelize, modelName: 'DroneMedication' }
);

export default DroneMedication;
