'use strict';

// Minimal, dependency-free "build" step: copies the static source files in
// src/ into dist/ so the backend can serve them as production assets.
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
fs.cpSync(srcDir, distDir, { recursive: true });

console.log(`Frontend built to ${distDir}`);
