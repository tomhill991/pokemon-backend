require('dotenv').config();
import express, { Application } from 'express'

const cors = require('cors');
const app: Application = express()
const port = process.env.SERVER_PORT || '8080'
const mongoose = require('mongoose')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const start = async (): Promise<void> => {
  try {
    app.use(cors())
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    const connection = await mongoose.connect(process.env.DB_PATH)

    if (!connection) {
      throw new Error(`Connection to MongoDB failed !: ${connection.error}`);
    } else {
        console.log('Connection to MongoDB successful !')
    }
  } catch (error) {
    console.error(error, 'error');
    process.exit(1);
  }
};

void start();
