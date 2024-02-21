import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/auth', userRoutes);


app.get('/', (req, res) => {
    res.send('abc');
})


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server Start at ${PORT}`);
})