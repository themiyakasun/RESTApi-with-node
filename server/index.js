import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import usersRoutes from './routers/users.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Hello from homepage');
});

app.listen(process.env.PORT, () => {
  console.log(`server running on port http://localhost:${process.env.PORT}`);
});
