import cors from 'cors';
import express from 'express';
import errorHandler from './routes/middlewares/errorHandler';
import authRouter from './routes/routers/authRouter';

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(errorHandler);

export default app;
