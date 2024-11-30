const dns = require('dns');
const { promisify } = require('util');

const dnsLookup = promisify(dns.lookup);

async function checkServerStatus(ip) {
  try {
    await dnsLookup(ip);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { checkServerStatus };