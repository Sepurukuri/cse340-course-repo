import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    categoryValidation
} from './controllers/categories.js';

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard
} from './controllers/users.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);

router.get('/projects', showProjectsPage);

router.get('/project/:id', showProjectDetailsPage);

router.get('/categories', showCategoriesPage);

router.get('/category/:id', showCategoryDetailsPage);

router.get('/organization/:id', showOrganizationDetailsPage);

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);

// Route to handle new organization form submission
router.post(
    '/new-organization',
    organizationValidation,
    processNewOrganizationForm
);

// Route to display the edit organization form
router.get(
    '/edit-organization/:id',
    showEditOrganizationForm
);

// Route to handle the edit organization form submission
router.post(
    '/edit-organization/:id',
    organizationValidation,
    processEditOrganizationForm
);

router.post(
    '/new-project',
    projectValidation,
    processNewProjectForm
);

// Routes to handle the assign categories form
router.get(
    '/assign-categories/:projectId',
    showAssignCategoriesForm
);

router.post(
    '/assign-categories/:projectId',
    processAssignCategoriesForm
);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', processNewProjectForm);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post(
    '/new-project',
    projectValidation,
    processNewProjectForm
);

// Route to display edit project form
router.get(
    '/edit-project/:id',
    showEditProjectForm
);

// Route to process edit project form
router.post(
    '/edit-project/:id',
    projectValidation,
    processEditProjectForm
);

// Route for new category page
router.get(
    '/new-category',
    showNewCategoryForm
);

// Route to process new category form
router.post(
    '/new-category',
    categoryValidation,
    processNewCategoryForm
);

// Route to display edit category form
router.get(
    '/edit-category/:id',
    showEditCategoryForm
);

// Route to process edit category form
router.post(
    '/edit-category/:id',
    categoryValidation,
    processEditCategoryForm
);

// User registration routes
router.get(
    '/register',
    showUserRegistrationForm
);

router.post(
    '/register',
    processUserRegistrationForm
);

// User login routes
router.get(
    '/login',
    showLoginForm
);

router.post(
    '/login',
    processLoginForm
);

router.get(
    '/logout',
    processLogout
);

// Protected dashboard route
router.get(
    '/dashboard',
    requireLogin,
    showDashboard
);

// Error test route
router.get(
    '/test-error',
    testErrorPage
);

export default router;
