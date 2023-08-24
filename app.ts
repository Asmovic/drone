import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes/drones';

export const app = express();
app.use(bodyParser.json());

app.use(routes);
