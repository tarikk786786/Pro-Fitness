const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const QRCode = require('qrcode');

let sock;
let qrCodeDataURL = null;
let connectionStatus = 'DISCONNECTED';

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info_baileys');

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: pino({ level: 'silent' })
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      connectionStatus = 'WAITING_FOR_QR';
      try {
        qrCodeDataURL = await QRCode.toDataURL(qr);
      } catch (err) {
        console.error('Failed to generate QR code data URL', err);
      }
    }

    if (connection === 'close') {
      qrCodeDataURL = null;
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('WhatsApp connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect);
      connectionStatus = 'DISCONNECTED';
      
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === 'open') {
      qrCodeDataURL = null;
      connectionStatus = 'CONNECTED';
      console.log('Opened connection to WhatsApp');
    }
  });
}

function getQR() {
  return qrCodeDataURL;
}

function getStatus() {
  return connectionStatus;
}

async function sendMessage(to, message) {
  if (connectionStatus !== 'CONNECTED' || !sock) {
    throw new Error('WhatsApp not connected');
  }

  // Format the number to WhatsApp format (e.g., 919876543210@s.whatsapp.net)
  const jid = `${to.replace(/\D/g, '')}@s.whatsapp.net`;
  
  await sock.sendMessage(jid, { text: message });
}

module.exports = {
  connectToWhatsApp,
  getQR,
  getStatus,
  sendMessage
};
