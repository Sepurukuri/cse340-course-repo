import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Middleware
 */

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
 */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/home.html'));
});

app.get('/organizations', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/organizations.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/projects.html'));
});

/**
 * Start server
 */

app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});