import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import errorMiddlewares from './middleware/errorMiddleware.js';
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// BOdy parser middleware / Allow to access req.body

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cookie parser middleware / Allow to access req.cookie.jwt
app.use(cookieParser());

connectDB();

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorMiddlewares.notFound);
app.use(errorMiddlewares.errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
