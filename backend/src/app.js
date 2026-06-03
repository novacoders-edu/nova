const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");
const authRouter = require('./routes/auth.route');
const memberRouter = require('./routes/member.route');
const contactRouter = require('./routes/contact.route');
const certificateRouter = require('./routes/certificte.route')
const app = express();

// ─── Security headers ─────────────────────────────────────────────────────────
// Disable contentSecurityPolicy so static assets (XML, fonts, images) aren't blocked
app.use(helmet({
  contentSecurityPolicy: false,
}));

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(cookieParser());

// ─── Serve frontend build ─────────────────────────────────────────────────────
// frontend/dist is two levels up from backend/src, one level up from backend/
const DIST_PATH = path.resolve(__dirname, '../../frontend/dist');

app.use(express.static(DIST_PATH, {
  // Ensure correct MIME types so Googlebot accepts sitemap.xml and robots.txt
  setHeaders(res, filePath) {
    if (filePath.endsWith('.xml')) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    }
    if (filePath.endsWith('robots.txt')) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    }
  }
}));

// ─── API routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRouter);
app.use('/api/member', memberRouter);
app.use('/api/contact', contactRouter);
app.use('/api/certificate', certificateRouter);

// ─── SPA fallback ─────────────────────────────────────────────────────────────
// Must be AFTER static and API routes.
// Do NOT match /api/* paths — return 404 JSON for unknown API calls instead.
app.get('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'));
});

// ─── Error handling ───────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? "Internal server error"
      : err.message
  });
});

module.exports = app;
