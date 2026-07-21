'use strict';

const path = require('path');
const express = require('express');

const app = express();

// The frontend build is copied to /app/frontend/dist in the Docker image,
// one level up from this backend's working directory (/app/backend).
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');

app.use(express.static(frontendDist));

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});

const port = process.env.PORT || 8080;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
