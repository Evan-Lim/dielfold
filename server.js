import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';
const INDEX_FILE = path.join(__dirname, 'index.html');

app.get(['/', '/index.html'], (_req, res) => {
  res.sendFile(INDEX_FILE);
});

app.use((_req, res) => {
  res.sendFile(INDEX_FILE);
});

app.listen(PORT, HOST, () => {
  console.log(`DielFold server listening at http://${HOST}:${PORT}`);
});
