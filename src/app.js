import cors from 'cors';
import express from 'express';
import errorHandler from './routes/middlewares/errorHandler';
import authRouter from './routes/routers/authRouter';
import usersRouter from './routes/routers/usersRouter';

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(usersRouter);
app.use(errorHandler);

export default app;
