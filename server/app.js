const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const billingRoutes = require('./routes/billing');
const webhookRoutes = require('./routes/webhooks');

const app = express();

app.use('/api/webhooks', express.raw({ type: 'application/json' }));
app.use((req, res, next) => {
  if (req.path.startsWith('/api/webhooks')) {
    return next();
  }

  return express.json()(req, res, next);
});

app.use('/api/billing', billingRoutes);
app.use('/api/webhooks', webhookRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const connectDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);
};

connectDatabase().catch((error) => {
  console.error('MongoDB connection error:', error);
});

module.exports = app;
