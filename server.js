import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5173;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.json': 'application/json',
  '.ico': 'image/x-icon'
};

function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        addresses.push(net.address);
      }
    }
  }
  return addresses;
}

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') {
    reqUrl = '/index.html';
  }

  let distPath = path.join(__dirname, 'dist', reqUrl);
  let filePath = (fs.existsSync(distPath) && !fs.statSync(distPath).isDirectory())
    ? distPath
    : path.join(__dirname, reqUrl);
  
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const publicPath = path.join(__dirname, 'public', reqUrl);
    if (fs.existsSync(publicPath) && !fs.statSync(publicPath).isDirectory()) {
      filePath = publicPath;
    }
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': stat.size,
    'Cache-Control': ext === '.jpg' ? 'public, max-age=31536000' : 'no-cache',
    'Access-Control-Allow-Origin': '*'
  });

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Mobile & Universal Server Running at:`);
  console.log(`- Local Desktop:  http://localhost:${PORT}/index.html`);
  console.log(`- Local IP:       http://127.0.0.1:${PORT}/index.html`);
  
  const localIps = getLocalIpAddresses();
  localIps.forEach(ip => {
    console.log(`- Mobile Wi-Fi:   http://${ip}:${PORT}/index.html`);
  });
  console.log(`==================================================\n`);
});
