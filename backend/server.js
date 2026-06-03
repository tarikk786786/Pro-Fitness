const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Route files
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const workoutRoutes = require('./routes/workouts');
const dietRoutes = require('./routes/diets');
const aiRoutes = require('./routes/ai');
const membershipRoutes = require('./routes/memberships');
const paymentRoutes = require('./routes/payments');
const blogRoutes = require('./routes/blogs');
const eventRoutes = require('./routes/events');
const progressRoutes = require('./routes/progress');
const adminRoutes = require('./routes/admin');
const trainerRoutes = require('./routes/trainer');
const notificationRoutes = require('./routes/notifications');
const whatsappRoutes = require('./routes/whatsapp');

const { errorHandler } = require('./middleware/errorHandler');
const { connectToWhatsApp } = require('./services/whatsappService');
const { startRemindersCron } = require('./cron/reminders');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://pro-fitness-live.netlify.app'] // Add production URLs
    : 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// Health Check / Root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'active',
    message: 'PRO FITNESS API Service is running smoothly',
    timestamp: new Date()
  });
});

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/diets', dietRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/trainer', trainerRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/whatsapp', whatsappRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function connectDB() {
  try {
    // Try to connect to the provided URI first
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected to local/cloud database');
  } catch (err) {
    console.log('Local MongoDB connection failed. Starting in-memory database for testing...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected to in-memory database at ${mongoUri}`);
  }
}

connectDB().then(() => {
  // Initialize WhatsApp connection
  connectToWhatsApp();
  
  // Start Background Cron Jobs
  startRemindersCron();

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Fatal Database Connection Error:', err);
  process.exit(1);
});
