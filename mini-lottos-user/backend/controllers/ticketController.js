const Ticket = require('../models/Ticket');

const getTickets = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {
      $or: [
        { userId: req.user._id },
        { userPhone: req.user.phone }
      ]
    };

    if (status === 'active') {
      filter.$or = [
        { userId: req.user._id, status: { $in: ['active', 'pending'] } },
        { userPhone: req.user.phone, status: { $in: ['active', 'pending'] } }
      ];
    } else if (status === 'past') {
      filter.$or = [
        { userId: req.user._id, status: { $in: ['won', 'lost'] } },
        { userPhone: req.user.phone, status: { $in: ['won', 'lost'] } }
      ];
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
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      $or: [
        { userId: req.user._id },
        { userPhone: req.user.phone }
      ]
    });
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
