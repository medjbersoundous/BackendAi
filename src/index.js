import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './api/config/db.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
connectDB();
import routes from './api/v1/routes/index.js';
let corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/api/v1', routes);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server running on port ${PORT}`);
  } else {
    console.log("Error occurred, server can't start: ", error);
  }
});
