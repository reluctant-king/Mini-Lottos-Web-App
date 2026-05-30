const cron = require('node-cron');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Notification = require('../models/Notification');
const WinnerAlert = require('../models/WinnerAlert');

const prizes = [500, 1000, 5000, 10000, 25000, 50000];

const startDrawEngine = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      const tickets = await Ticket.find({
        drawDate: { $lte: now },
        status: 'active'
      });

      if (tickets.length === 0) return;

      console.log(`[DrawEngine] Processing ${tickets.length} ticket(s)...`);

      for (const ticket of tickets) {
        const isWinner = Math.random() < 0.2;

        if (isWinner) {
          const prize = prizes[Math.floor(Math.random() * prizes.length)];
          ticket.status = 'won';
          ticket.prize = prize;
          console.log(`[DrawEngine] Ticket ${ticket.ticketNumber} WON ₹${prize}`);

          if (ticket.userId) {
            await Notification.create({
              userId: ticket.userId,
              type: 'win',
              title: 'Congratulations!',
              message: `You won ₹${prize}!`
            });

            const user = await User.findById(ticket.userId);
            if (user) {
              await WinnerAlert.create({
                agentId: ticket.agentId,
                ticketId: ticket._id,
                ticketNumber: ticket.ticketNumber,
                prize,
                winnerName: user.name,
                winnerPhone: user.phone
              });
            }
          }
        } else {
          ticket.status = 'lost';
          console.log(`[DrawEngine] Ticket ${ticket.ticketNumber} LOST`);

          if (ticket.userId) {
            await Notification.create({
              userId: ticket.userId,
              type: 'draw',
              title: 'Draw Result',
              message: `Ticket #${ticket.ticketNumber} did not win this draw. Better luck next time!`
            });
          }
        }

        await ticket.save();
      }

      console.log(`[DrawEngine] Draw complete - ${tickets.length} ticket(s) processed`);
    } catch (error) {
      console.error(`[DrawEngine] Error: ${error.message}`);
    }
  });

  console.log('[DrawEngine] Cron job started (every 60 seconds)');
};

module.exports = startDrawEngine;
