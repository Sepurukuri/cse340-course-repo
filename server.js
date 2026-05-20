import 'dotenv/config';

import { testConnection } from './src/models/db.js';

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import router from './src/routes.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine
app.set("view engine", "ejs");

app.engine("ejs", (await import("ejs")).renderFile);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Global variables available to all EJS templates
app.use((req, res, next) => {

    res.locals.currentYear = new Date().getFullYear();
    res.locals.NODE_ENV = NODE_ENV;

    next();
});

// Middleware to log requests in development mode
app.use((req, res, next) => {

    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }

    next();
});

// Use router
app.use(router);

// Catch-all route for 404 errors
app.use((req, res, next) => {

    const err = new Error('Page Not Found');

    err.status = 404;

    next(err);
});

// Global error handler
app.use((err, req, res, next) => {

    console.error('Error occurred:', err.message);
    console.error(err.stack);

    const status = err.status || 500;

    const template = status === 404
        ? '404'
        : '500';

    res.status(status).render(`errors/${template}`, {

        title: status === 404
            ? 'Page Not Found'
            : 'Server Error',

        error: err.message,
        stack: err.stack
    });
});

// Start server
app.listen(PORT, async () => {

    try {

        await testConnection();

        console.log(`Server is running at http://127.0.0.1:${PORT}`);

        console.log(`Environment: ${NODE_ENV}`);

    } catch (error) {

        console.error('Error connecting to the database:', error);

    }
});