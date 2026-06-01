const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedData = require('./utils/seed');
const startDrawEngine = require('./utils/drawEngine');

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://mini-lottos-app.vercel.app', 'https://mini-lottos-web-app-agent.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/alerts', require('./routes/alertRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5002;

const start = async () => {
  await connectDB();
  await seedData();
  startDrawEngine();
  app.listen(PORT, () => {
    console.log(`Agent Portal Backend running on port ${PORT}`);
  });
};

start();
