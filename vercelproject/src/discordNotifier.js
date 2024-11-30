const fetch = require('node-fetch');

async function sendDiscordMessage(webhookUrl, message) {
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
      }),
    });
  } catch (error) {
    console.error('Error sending Discord message:', error);
  }
}