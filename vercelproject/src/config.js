require('dotenv').config();

module.exports = {
  discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
  serverIp: process.env.SERVER_IP,
  checkInterval: parseInt(process.env.CHECK_INTERVAL, 10),
  notifyInterval: parseInt(process.env.NOTIFY_INTERVAL, 10)
};