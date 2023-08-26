/* import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export enum DroneModelEnum {
  LightWeight = 'Lightweight',
  MiddleWeight = 'Middleweight',
  CruiserWeight = 'Cruiserweight',
  HeavyWeight = 'Heavyweight',
}

export enum DroneState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  RETURNING = 'RETURNING',
}

const Drone = sequelize.define('Drone', {
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    validate: {
      len: {
        args: [1, 100], // Validate length between 1 and 100 characters
        msg: 'Serial number cannot be more than 100 characters',
      },
    },
  },
  model: {
    type: DataTypes.ENUM,
    values: Object.values(DroneModelEnum), // Use enum values in the field definition
    allowNull: false,
    validate: {
      isIn: {
        args: [Object.values(DroneModelEnum)], // Validate that the value is in the enum values
        msg: 'Invalid drone model', // Custom error message
      },
    },
  },
  weightLimit: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      max: 500, // Validate maximum weight limit
    },
  },
  batteryCapacity: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0, // Validate minimum battery capacity
      max: 100, // Validate maximum battery capacity
    },
  },
  state: {
    type: DataTypes.ENUM,
    values: Object.values(DroneState), // Use enum values in the field definition
    allowNull: false,
    validate: {
      isIn: {
        args: [Object.values(DroneState)], // Validate that the value is in the enum values
        msg: 'Invalid drone state', // Custom error message
      },
    },
  },
});

export default Drone;
 */