import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorMiddlewares from './middleware/errorMiddleware.js';
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(errorMiddlewares.notFound);
app.use(errorMiddlewares.errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
