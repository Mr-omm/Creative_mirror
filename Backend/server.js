// server.js
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');
const questsRoutes = require('./routes/quests');
const marketplaceRoutes = require('./routes/marketplace');
const parentalRoutes = require('./routes/parental');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGO_URI);

// mount routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/quests', questsRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/parental', parentalRoutes);

app.get('/', (req,res) => res.send({ ok: true, name: 'Creative Mirror API' }));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
