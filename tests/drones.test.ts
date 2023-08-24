import request from 'supertest';
import { app } from '../app';

describe('Drone API', () => {
  it('should register a new drone', async () => {
    const res = await request(app).post('/drones').send({
      serialNumber: 'DRN00TEST',
      model: 'Middleweight',
      weightLimit: 700,
      batteryCapacity: 90,
      state: 'LOADING',
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Drone registered successfully');
  });

});
