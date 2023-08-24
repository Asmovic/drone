import Drone from '../models/drone';

beforeAll(async () => {
  /*   await Drone.destroy({
    where: {
      serialNumber: 'DRN00TEST',
    },
  }); */
});

beforeEach(async () => {});

afterAll(async () => {
  await Drone.destroy({
    where: {
      serialNumber: 'DRN00TEST',
    },
  });
});
