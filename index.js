const express = require('express');
const app = express();
app.use(express.json());

app.use((req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
});

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby8POomubezzWl7_sc9ji8ru_1dNn_K2cf7zqQIbrbXb8ByYUur7ngA3DVOqLSFPo34/exec';

app.post('/save', async (req, res) => {
  try {
    const url = APPS_SCRIPT_URL + '?row=' + encodeURIComponent(JSON.stringify(req.body.row));
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000);