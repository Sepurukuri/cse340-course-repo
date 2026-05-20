import 'dotenv/config';

import { testConnection } from './src/models/db.js';
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

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
    res.locals.NODE_ENV = process.env.NODE_ENV;
    next();
});

// Middleware to log requests in development mode
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

// Routes
app.get("/", (req, res) => {
    res.render("home", {
        title: "Home"
    });
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();

    res.render('organizations', {
        title: 'Our Partner Organizations',
        organizations
    });
});

app.get('/projects', async (req, res) => {
    const projects = await getAllProjects();

    res.render('projects', {
        title: 'Community Service Projects',
        projects
    });
});

app.get('/categories', async (req, res) => {
    const categories = await getAllCategories();

    res.render('categories', {
        title: 'Project Categories',
        categories
    });
});

// Test route for 500 errors
app.get('/test-error', (req, res, next) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
});

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
    const template = status === 404 ? '404' : '500';

    res.status(status).render(`errors/${template}`, {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    });
});

// Start server
app.listen(PORT, async () => {
    try {
        await testConnection();

        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});