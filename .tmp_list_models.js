const fs = require('fs');
const https = require('https');
const env = fs.readFileSync('.env.local', 'utf8');
const key = env.split(/\r?\n/).find((l) => l.startsWith('GEMINI_API_KEY=')).split('=')[1];
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`;
https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => (data += chunk));
  res.on('end', () => {
    console.log(res.statusCode, res.statusMessage);
    console.log(data);
  });
}).on('error', (e) => {
  console.error('ERR', e.message);
});
