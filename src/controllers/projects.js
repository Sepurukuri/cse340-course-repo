// Import model functions
import { getAllProjects } from '../models/projects.js';

// Define controller functions
const showProjectsPage = async (req, res) => {

    const projects = await getAllProjects();
    const title = 'Community Service Projects';

    res.render('projects', {
        title,
        projects
    });
};

// Export controller functions
export { showProjectsPage };