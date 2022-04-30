require('dotenv').config();
import express, { Application } from 'express'
import {
  pokemonRouter,
} from './routes'
const cors = require('cors');
const app: Application = express()
const mongoose = require('mongoose')
const isTest = process.env.NODE_ENV === 'test'
const port = !isTest ? (process.env.SERVER_PORT || '8080') : '9999'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


try {
    app.use(cors())
    app.use('/api/pokemons', pokemonRouter)
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
} catch (error) {
    console.error(error, 'error');
    process.exit(1);
}

const connection = mongoose.connect(process.env.DB_PATH)

if (!connection) {
    throw new Error(`Connection to MongoDB failed !: ${connection.error}`);
} else {
    console.log('Connection to MongoDB successful !')
}

mongoose.set('debug', !isTest);

export default app



