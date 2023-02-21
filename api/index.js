require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('../config/db');
const productRoutes = require('../routes/productRoutes');
const planRoutes = require('../routes/planRoutes');
const bannerRoutes = require('../routes/bannerRoutes');
const userRoutes = require('../routes/userRoutes');
const mintRoutes = require('../routes/mintRoutes');
const nftRoutes = require('../routes/nftRoutes');
const transactionRoutes = require('../routes/transactionRoutes');
const adminRoutes = require('../routes/adminRoutes');
const orderRoutes = require('../routes/orderRoutes');
const userOrderRoutes = require('../routes/userOrderRoutes');
const categoryRoutes = require('../routes/categoryRoutes');
const couponRoutes = require('../routes/couponRoutes');

const clientsRoutes = require('../routes/clientsRoutes');


const { isAuth, isAdmin } = require('../config/auth');

connectDB();
const app = express();

// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
app.enable('trust proxy');

app.use(express.json({ limit: '4mb' }));
app.use(cors());

//root route
app.get('/', (req, res) => {
  res.send('App works properly!');
});

//this for route will need for store front, also for admin dashboard
app.use('/api/auth/', userRoutes);
app.use('/api/plans/', planRoutes);

app.use('/api/products/', productRoutes);
app.use('/api/banners/', bannerRoutes);
app.use('/api/category/', categoryRoutes);
app.use('/api/coupon/', couponRoutes);
app.use('/api/users/', userRoutes);
app.use('/api/transaction/', transactionRoutes);
app.use('/api/mint/', mintRoutes);
app.use('/api/nfts/', nftRoutes);
app.use('/api/order/', isAuth, userOrderRoutes);

//if you not use admin dashboard then these two route will not needed.
app.use('/api/admin/', adminRoutes);
app.use('/api/orders/', isAuth, orderRoutes);

app.use('/api/clients/', clientsRoutes);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ err: err });
});

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
