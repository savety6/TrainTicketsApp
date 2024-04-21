import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import Auth from './Routes/AuthRouter';
import User from './Routes/UserRouter';
import Schedule from './Routes/ScheduleRouter';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

mongoose.connect(process.env.DATABASE_URL!);
const db = mongoose.connection;


db.on('error', (error)=> console.log(error));
db.once('open', () => { console.log('connected to db')});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/Auth', Auth);
app.use('/User', User);
app.use('/Schedule', Schedule);

app.get('/', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});