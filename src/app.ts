import express from 'express';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
