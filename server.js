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

app.set("view engine", "ejs");

app.engine("ejs", (await import("ejs")).renderFile);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.locals.currentYear = new Date().getFullYear();
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
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
});

app.get('/projects', async (req, res) => {

    const projects = await getAllProjects();
    console.log(projects);
    const title = 'Community Service Projects';
    res.render('projects', {
        title,
        projects
    });
});

app.get('/categories', async (req, res) => {

    const categories = await getAllCategories();
    console.log(categories);
    const title = 'Project Categories';
    res.render('categories', {
        title,
        categories
    });
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});