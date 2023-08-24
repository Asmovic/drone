import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

enum DroneModel {
  LightWeight = 'Lightweight',
  MiddleWeight = 'Middleweight',
  CruiserWeight = 'Cruiserweight',
  HeavyWeight = 'Heavyweight',
}

enum DroneState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  RETURNING = 'RETURNING',
}

interface DroneAttributes {
  serialNumber: string;
  model: DroneModel;
  weightLimit: number;
  batteryCapacity: number;
  state: DroneState;
}

interface DroneInstance extends Model<DroneAttributes>, DroneAttributes {}

const Drone = sequelize.define<DroneInstance>('Drone', {
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weightLimit: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  batteryCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  state: {
    type: DataTypes.ENUM(
      'IDLE',
      'LOADING',
      'LOADED',
      'DELIVERING',
      'DELIVERED',
      'RETURNING'
    ),
    defaultValue: DroneState.IDLE,
    allowNull: false,
  },
});

export default Drone;
