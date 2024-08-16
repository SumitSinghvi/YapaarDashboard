//imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import getOrders from './routes/orders.js';

//import env variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use('/api', getOrders);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
