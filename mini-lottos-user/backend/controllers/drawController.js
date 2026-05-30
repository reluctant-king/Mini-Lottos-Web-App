const Draw = require('../models/Draw');
const Ticket = require('../models/Ticket');

const getUpcoming = async (req, res) => {
  try {
    const draws = await Draw.find({ status: 'upcoming' }).sort({ drawDate: 1 }).limit(3);
    res.json({ success: true, draws });
  } catch (error) {
    console.error('Get upcoming draws error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getResults = async (req, res) => {
  try {
    const draws = await Draw.find({ status: { $ne: 'upcoming' } }).sort({ drawDate: -1 }).limit(10);
    res.json({ success: true, draws });
  } catch (error) {
    console.error('Get results error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getWinners = async (req, res) => {
  try {
    const winners = await Ticket.find({ status: 'won' })
      .populate('userId', 'name')
      .sort({ prize: -1 })
      .limit(5);
    res.json({ success: true, winners });
  } catch (error) {
    console.error('Get winners error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getUpcoming, getResults, getWinners };
