const fs = require('fs');
const Drone = require('../../models/drone2');
const Medication = require('../../models/medication');

const { sequelize } = require('../../database');

//READ JSON FILE
const drones = JSON.parse(
  fs.readFileSync(`${__dirname}/../drone.json`, 'utf-8')
);
const medications = JSON.parse(
  fs.readFileSync(`${__dirname}/../medication.json`, 'utf-8')
);

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('sequelize', sequelize.models.Drone);
    await sequelize.models.Drone.bulkCreate(drones);
    await sequelize.models.Medication.bulkCreate(medications);
    console.log('Data Successfully Loaded.');
  } catch (error) {
    console.log('Error', error);
  }
  process.exit();
};

//DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await sequelize.sync();
    await sequelize.models.Drone.destroy({ where: {} });
    await sequelize.models.Medication.destroy({ where: {} });
    console.log('Data deleted successfully');
  } catch (error) {
    console.log('Error', error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else {
  deleteData();
}
