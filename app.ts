import express from 'express';
import bodyParser from 'body-parser';

import droneRoutes from './routes/drones';
import medicationRoutes from './routes/medication';

export const app = express();
app.use(bodyParser.json());
app.get('/', (req,res)=>{
  res.send({ message: "Hi Buddy!!" });
});
app.use(droneRoutes);
app.use(medicationRoutes);
