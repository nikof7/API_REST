import 'dotenv/config'
import "./database/connectdb.js"
import express from 'express';
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1/auth', authRouter);

// Solo para un ejemplo de login y token
app.use(express.static('public'))

const PORT = process.env.PORT || 5000

app.listen(5000, () => console.log(`Server started on http://localhost:${PORT}/`));