const WinnerAlert = require('../models/WinnerAlert');

const getWinners = async (req, res) => {
  try {
    const alerts = await WinnerAlert.find({ agentId: req.agent.agentId, read: false })
      .populate('ticketId')
      .sort({ createdAt: -1 });

    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const markRead = async (req, res) => {
  try {
    const { id } = req.params;

    const alert = await WinnerAlert.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    res.json({ message: 'Marked as read', alert });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getWinners, markRead };
