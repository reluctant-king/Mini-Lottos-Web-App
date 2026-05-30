const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Draw = require('../models/Draw');
const Notification = require('../models/Notification');

const seedData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }

    console.log('Seeding database...');

    const arjun = await User.create({
      phone: '9999999999',
      name: 'Arjun',
      district: 'Kochi',
      balance: 120.50,
      coins: 18
    });

    await User.create({
      phone: '8888888888',
      name: 'Priya',
      district: 'Trivandrum',
      balance: 50,
      coins: 25
    });

    await Ticket.insertMany([
      {
        ticketNumber: 'ML-1001',
        userId: arjun._id,
        userPhone: '9999999999',
        numbers: [4, 12, 21, 33, 45],
        category: 'Daily Draw',
        price: 2,
        drawDate: new Date(Date.now() + 5 * 86400000),
        status: 'active',
        gameName: 'Daily Mini Lotto'
      },
      {
        ticketNumber: 'ML-1002',
        userId: arjun._id,
        userPhone: '9999999999',
        numbers: [7, 14, 22, 29, 40],
        category: 'Mini Lottos',
        price: 5,
        drawDate: new Date(Date.now() + 7 * 86400000),
        status: 'active',
        gameName: 'Mini Weekly'
      },
      {
        ticketNumber: 'ML-1003',
        userId: arjun._id,
        userPhone: '9999999999',
        numbers: [7, 18, 22, 29, 40],
        category: 'Quick Pick',
        price: 5,
        drawDate: new Date(Date.now() - 2 * 86400000),
        status: 'won',
        prize: 500,
        gameName: 'Quick Pick 5'
      },
      {
        ticketNumber: 'ML-1004',
        userId: arjun._id,
        userPhone: '9999999999',
        numbers: [3, 11, 19, 27, 44],
        category: 'Mini Lottos',
        price: 10,
        drawDate: new Date(Date.now() - 5 * 86400000),
        status: 'won',
        prize: 50000,
        gameName: 'Mini Lottos'
      },
      {
        ticketNumber: 'ML-1005',
        userId: arjun._id,
        userPhone: '9999999999',
        numbers: [2, 8, 15, 23, 38],
        category: 'Daily Draw',
        price: 2,
        drawDate: new Date(Date.now() - 3 * 86400000),
        status: 'lost',
        gameName: 'Daily Draw'
      },
      {
        ticketNumber: 'ML-1006',
        userId: arjun._id,
        userPhone: '9999999999',
        numbers: [5, 13, 20, 31, 46],
        category: 'Bumper',
        price: 20,
        drawDate: new Date(Date.now() + 10 * 86400000),
        status: 'pending',
        gameName: 'Midnight Madness'
      }
    ]);

    await Draw.insertMany([
      {
        name: 'Super Daily',
        drawDate: new Date(Date.now() + 2 * 86400000),
        jackpot: 5000000,
        status: 'upcoming',
        winningNumbers: [4, 12, 21, 33, 45]
      },
      {
        name: 'Quick 5',
        drawDate: new Date(Date.now() + 1 * 86400000),
        jackpot: 50000,
        status: 'upcoming',
        winningNumbers: [7, 14, 22, 29, 40]
      },
      {
        name: 'Mini Weekly',
        drawDate: new Date(Date.now() + 7 * 86400000),
        jackpot: 100000,
        status: 'upcoming',
        winningNumbers: [3, 11, 19, 27, 44]
      }
    ]);

    await Notification.insertMany([
      {
        userId: arjun._id,
        type: 'win',
        title: 'Winning Alert',
        message: 'Congratulations! You won ₹500 in the Weekly Draw.'
      },
      {
        userId: arjun._id,
        type: 'draw',
        title: 'Draw Result Out',
        message: 'The results for today\'s Mini Weekly draw are out.'
      },
      {
        userId: arjun._id,
        type: 'bonus',
        title: 'Daily Bonus',
        message: 'Earn double coins today by playing our Daily Quiz!'
      }
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seed error:', error);
  }
};

module.exports = seedData;
