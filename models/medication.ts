import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'; // Import your Sequelize instance

interface MedicationAttributes {
  id: number;
  name: string;
  weight: number;
  code: string;
  image: string;
}

class Medication extends Model<MedicationAttributes> {
  public name!: string;
  public weight!: number;
  public code!: string;
  public image!: string;

  build = (attrs: MedicationAttributes) => {
    return new Medication(attrs);
  };

  static associate(models: any) {
    this.belongsToMany(models.Drone, { through: models.DroneMedication });
  }
}

Medication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^[a-zA-Z0-9\-_]*$/, // Regular expression for allowed characters
          msg: 'Name must only contain letters, numbers, hyphens, and underscores.',
        },
      },
      allowNull: false,
      unique: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^[A-Z0-9_]*$/, // Regular expression for allowed characters
          msg: 'Code must only contain upper case letters, underscore and numbers',
        },
      },
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Medication',
  }
);

export default Medication;
