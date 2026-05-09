import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");

app.engine("ejs", (await import("ejs")).renderFile);

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.render("home", {
        title: "Home"
    });
});

app.get("/organizations", (req, res) => {
    res.render("organizations", {
        title: "Organizations"
    });
});

app.get("/projects", (req, res) => {
    res.render("projects", {
        title: "Projects"
    });
});

app.get("/categories", (req, res) => {
    res.render("categories", {
        title: "Categories"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});