const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Notification = require('../models/Notification');
const WinnerAlert = require('../models/WinnerAlert');

const generateTicketNumber = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ML-${random}`;
};

const generateRandomNumbers = () => {
  const numbers = new Set();
  while (numbers.size < 5) {
    numbers.add(Math.floor(Math.random() * 49) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

const createEntry = async (req, res) => {
  try {
    const { entries, category, price } = req.body;

    if (!entries || entries < 1) {
      return res.status(400).json({ message: 'At least one entry is required' });
    }

    let ticketNumber;
    let isUnique = false;
    while (!isUnique) {
      ticketNumber = generateTicketNumber();
      const existing = await Ticket.findOne({ ticketNumber });
      if (!existing) isUnique = true;
    }

    const drawDate = new Date();
    drawDate.setDate(drawDate.getDate() + 5);

    const ticket = await Ticket.create({
      ticketNumber,
      agentId: req.agent.agentId,
      category: category || 'Mini Lottos',
      price: price || 0,
      status: 'pending',
      drawDate
    });

    res.status(201).json({ ticketId: ticket._id, ticketNumber: ticket.ticketNumber });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const linkTicket = async (req, res) => {
  try {
    const { ticketId, userPhone } = req.body;

    if (!ticketId || !userPhone) {
      return res.status(400).json({ message: 'ticketId and userPhone are required' });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.agentId !== req.agent.agentId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (ticket.status !== 'pending') {
      return res.status(400).json({ message: 'Ticket is already linked' });
    }

    const user = await User.findOne({ phone: userPhone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const numbers = generateRandomNumbers();
    const drawDate = new Date();
    drawDate.setDate(drawDate.getDate() + 5);

    ticket.userId = user._id;
    ticket.userPhone = user.phone;
    ticket.userIdCode = user.userIdCode || '';
    ticket.numbers = numbers;
    ticket.drawDate = drawDate;
    ticket.status = 'active';
    await ticket.save();

    await Notification.create({
      userId: user._id,
      type: 'info',
      title: 'New Ticket Purchased',
      message: `Your agent has purchased a new ticket for you. Ticket #${ticket.ticketNumber}`
    });

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTickets = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = { agentId: req.agent.agentId };

    if (status && status !== 'all') {
      if (status === 'active') {
        query.status = 'active';
      } else if (status === 'completed') {
        query.status = { $in: ['won', 'lost'] };
      } else if (status === 'winners') {
        query.status = 'won';
      }
    }

    if (search) {
      query.$or = [
        { ticketNumber: { $regex: search, $options: 'i' } },
        { userPhone: { $regex: search, $options: 'i' } }
      ];
    }

    const tickets = await Ticket.find(query)
      .populate('userId', 'name phone')
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id).populate('userId', 'name phone district');
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.agentId !== req.agent.agentId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const scanTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find({ agentId: req.agent.agentId, status: { $ne: 'pending' } })
      .populate('userId', 'name phone')
      .sort({ createdAt: -1 });

    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No tickets found to scan' });
    }

    const randomIndex = Math.floor(Math.random() * tickets.length);
    const ticket = tickets[randomIndex];

    let result;
    if (ticket.status === 'won') {
      result = 'Winner!';
    } else if (ticket.status === 'lost') {
      result = 'Not a winning ticket';
    } else {
      result = 'Draw pending';
    }

    res.json({
      ticketNumber: ticket.ticketNumber,
      numbers: ticket.numbers,
      status: ticket.status,
      result,
      prize: ticket.prize,
      category: ticket.category,
      drawDate: ticket.drawDate,
      user: ticket.userId ? { name: ticket.userId.name, phone: ticket.userId.phone } : null
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const markContacted = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.agentId !== req.agent.agentId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    ticket.contacted = true;
    await ticket.save();

    await WinnerAlert.updateMany({ ticketId: id }, { contacted: true });

    res.json({ message: 'Marked as contacted', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createEntry, linkTicket, getTickets, getTicket, scanTicket, markContacted };
