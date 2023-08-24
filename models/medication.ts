import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

class Medication extends Model {}

Medication.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Medication',
});

export default Medication;
