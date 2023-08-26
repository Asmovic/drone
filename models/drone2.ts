import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'; // Import your Sequelize instance

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

interface DroneAttributes {
  serialNumber: string;
  model: DroneModelEnum;
  weightLimit: number;
  batteryCapacity: number;
  state: DroneState;
  loadedMedicationsId?: number[];
}

/* interface DroneInstance extends Model<DroneAttributes> {
  serialNumber: string;
  model: DroneModelEnum;
  weightLimit: number;
  batteryCapacity: number;
  state: DroneState;
  loadedMedications?: string;
} */

class Drone extends Model {
  public serialNumber!: string;
  public model!: DroneModelEnum;
  public weightLimit!: number;
  public batteryCapacity!: number;
  public state!: DroneState;
  public loadedMedicationsId!: number[];

  build = (attrs: any) => {
    return new Drone(attrs);
  };

  /*   static associate(models: any) {
    this.belongsToMany(models.Medication, { through: models.DroneMedication });
  } */
}

Drone.init(
  {
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
      defaultValue: DroneState.IDLE,
      validate: {
        isIn: {
          args: [Object.values(DroneState)], // Validate that the value is in the enum values
          msg: 'Invalid drone state', // Custom error message
        },
      },
    },
    loadedMedicationsId: {
      type: DataTypes.STRING, // Specify the data type for the array elements
      allowNull: false,
      defaultValue: '[]', // or false, depending on your requirements
    },
  },
  {
    sequelize,
    modelName: 'Drone',
  }
);

export default Drone;
