import express from 'express';
import bodyParser from 'body-parser';

import droneRoutes from './routes/drones';
import medicationRoutes from './routes/medication';

export const app = express();
app.use(bodyParser.json());

app.use(droneRoutes);
app.use(medicationRoutes);
