const Ticket = require('../models/Ticket');

const getDaily = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const ticketsToday = await Ticket.countDocuments({
      agentId: req.agent.agentId,
      createdAt: { $gte: today, $lt: tomorrow }
    });

    const miniLottoTickets = await Ticket.countDocuments({
      agentId: req.agent.agentId,
      category: 'Mini Lottos',
      createdAt: { $gte: today, $lt: tomorrow }
    });

    const winnersToday = await Ticket.countDocuments({
      agentId: req.agent.agentId,
      status: 'won',
      createdAt: { $gte: today, $lt: tomorrow }
    });

    res.json({
      ticketsSold: ticketsToday,
      miniLottoEntries: miniLottoTickets,
      winners: winnersToday
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSales = async (req, res) => {
  try {
    const { period } = req.query;

    if (period === 'daily') {
      const data = [];
      const now = new Date();
      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);

      for (let h = 0; h < 24; h += 2) {
        const hourStart = new Date(startOfDay);
        hourStart.setHours(h, 0, 0, 0);
        const hourEnd = new Date(hourStart);
        hourEnd.setHours(h + 2, 0, 0, 0);

        const count = await Ticket.countDocuments({
          agentId: req.agent.agentId,
          createdAt: { $gte: hourStart, $lt: hourEnd }
        });

        const label = h === 0 ? '12am' : h < 12 ? `${h}am` : h === 12 ? '12pm' : `${h - 12}pm`;

        data.push({ label, value: count * 200 });
      }

      res.json({ period: 'daily', labels: data.map(d => d.label), values: data.map(d => d.value), data });
    } else {
      const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const data = [];
      const now = new Date();

      for (let i = 6; i >= 0; i--) {
        const dayStart = new Date(now);
        dayStart.setDate(dayStart.getDate() - i);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayEnd.getDate() + 1);

        const count = await Ticket.countDocuments({
          agentId: req.agent.agentId,
          createdAt: { $gte: dayStart, $lt: dayEnd }
        });

        data.push({ label: days[dayStart.getDay()], value: count * 200 });
      }

      res.json({ period: 'weekly', labels: data.map(d => d.label), values: data.map(d => d.value), data });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getActivity = async (req, res) => {
  try {
    const tickets = await Ticket.find({ agentId: req.agent.agentId })
      .populate('userId', 'name phone')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getDaily, getSales, getActivity };
