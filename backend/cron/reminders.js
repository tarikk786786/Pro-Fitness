const cron = require('node-cron');
const User = require('../models/User');
const whatsappService = require('../services/whatsappService');

function startRemindersCron() {
  // Run every morning at 8:00 AM
  cron.schedule('0 8 * * *', async () => {
    console.log('Running daily membership reminder cron job...');
    
    try {
      if (whatsappService.getStatus() !== 'CONNECTED') {
        console.log('WhatsApp is not connected. Skipping reminders.');
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Find users with active membership (or recently expired)
      const users = await User.find({
        'membership.plan': { $ne: 'none' },
        phone: { $exists: true, $ne: '' }
      });

      for (const user of users) {
        if (!user.membership.endDate) continue;

        const endDate = new Date(user.membership.endDate);
        endDate.setHours(0, 0, 0, 0);

        const diffTime = endDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let message = null;

        if (diffDays === 3) {
          message = `Hi ${user.name}, your PRO FITNESS ${user.membership.plan.toUpperCase()} membership expires in 3 days. Renew now to keep enjoying our services!`;
        } else if (diffDays === 1) {
          message = `Hi ${user.name}, your PRO FITNESS ${user.membership.plan.toUpperCase()} membership expires tomorrow! Don't miss out on your fitness goals.`;
        } else if (diffDays === -1) {
          message = `Hi ${user.name}, your PRO FITNESS ${user.membership.plan.toUpperCase()} membership expired yesterday. Renew today to get back on track!`;
        }

        if (message) {
          try {
            await whatsappService.sendMessage(user.phone, message);
            console.log(`Sent reminder to ${user.name} (${user.phone}) - Days: ${diffDays}`);
          } catch (err) {
            console.error(`Failed to send reminder to ${user.phone}:`, err.message);
          }
        }
      }
    } catch (error) {
      console.error('Error in reminder cron job:', error);
    }
  });
}

module.exports = { startRemindersCron };
