const Ticket = require('../models/Ticket');

const getTickets = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = { userId: req.user._id };

    if (status === 'active') {
      filter.status = { $in: ['active', 'pending'] };
    } else if (status === 'past') {
      filter.status = { $in: ['won', 'lost'] };
    }

    const tickets = await Ticket.find(filter).sort({ drawDate: -1 });
    res.json({ success: true, tickets });
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, userId: req.user._id });
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.json({ success: true, ticket });
  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getTickets, getTicket };
