const bcrypt = require('bcryptjs');
const Agent = require('../models/Agent');
const User = require('../models/User');
const WinnerAlert = require('../models/WinnerAlert');

const seedData = async () => {
  try {
    const agentCount = await Agent.countDocuments();
    if (agentCount === 0) {
      console.log('[Seed] Seeding agent...');
      await Agent.create({
        agentId: '88291020',
        password: bcrypt.hashSync('agent123', 10),
        name: 'Sarah Miller',
        phone: '+1234567890',
        district: 'North Central District',
        photo: 'https://i.pravatar.cc/150?img=47'
      });
      console.log('[Seed] Agent created: 88291020 / agent123');
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('[Seed] Seeding users...');
      await User.create([
        { phone: '9999999999', name: 'Arjun', district: 'Kochi' },
        { phone: '8888888888', name: 'Priya', district: 'Trivandrum' }
      ]);
      console.log('[Seed] Users created');
    }

    const alertCount = await WinnerAlert.countDocuments();
    if (alertCount === 0) {
      console.log('[Seed] Seeding winner alerts...');
      await WinnerAlert.create([
        {
          agentId: '88291020',
          ticketNumber: 'ML-8742',
          prize: 50000,
          winnerName: 'Rahul Sharma',
          winnerPhone: '+91 98765 43210'
        },
        {
          agentId: '88291020',
          ticketNumber: 'ML-8743',
          prize: 25000,
          winnerName: 'Priya Singh',
          winnerPhone: '+91 87654 32109'
        }
      ]);
      console.log('[Seed] Winner alerts created');
    }
  } catch (error) {
    console.error(`[Seed] Error: ${error.message}`);
  }
};

module.exports = seedData;
