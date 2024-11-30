const { discordWebhookUrl, serverIp, checkInterval, notifyInterval } = require('./config');
const { checkServerStatus } = require('./serverChecker');
const { sendDiscordMessage } = require('./discordNotifier');

let lastStatus = null;
let lastNotification = 0;

async function monitor() {
  const isOnline = await checkServerStatus(serverIp);
  const currentTime = Date.now();

  // Send status change notifications immediately
  if (lastStatus !== null && lastStatus !== isOnline) {
    const status = isOnline ? '✅ Server is back online!' : '❌ Server is offline!';
    await sendDiscordMessage(discordWebhookUrl, `${status}\nServer: ${serverIp}\nTime: ${new Date().toLocaleString()}`);
  }

  // Send periodic working notifications
  if (currentTime - lastNotification >= notifyInterval) {
    await sendDiscordMessage(
      discordWebhookUrl,
      `🔍 Monitor Status: Active\nServer: ${serverIp}\nCurrent Status: ${isOnline ? 'Online ✅' : 'Offline ❌'}\nTime: ${new Date().toLocaleString()}`
    );
    lastNotification = currentTime;
  }

  lastStatus = isOnline;
}

// Initial check
monitor();

// Schedule regular checks
setInterval(monitor, checkInterval);

console.log(`🚀 Server monitor started\nMonitoring: ${serverIp}\nCheck interval: ${checkInterval/1000}s\nNotification interval: ${notifyInterval/1000}s`);