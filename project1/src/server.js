'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Don't leak framework fingerprint
app.disable('x-powered-by');

// Baseline security headers
app.use(helmet());

// Basic rate limiting to slow down abusive clients
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json({ limit: '1mb' }));

// Serve static assets (built frontend / public files)
app.use(express.static(path.join(__dirname, '..', 'static')));

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const port = process.env.PORT || 8080;

// Only start listening when run directly (keeps the app requireable in tests)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
