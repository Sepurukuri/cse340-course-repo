import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    createCategory,
    updateCategory,
    updateCategoryAssignments
} from '../models/categories.js';

import {
    getProjectDetails
} from '../models/projects.js';

import {
    body,
    validationResult
} from 'express-validator';

const categoryValidation = [

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage(
            'Category name must be between 3 and 100 characters'
        )
];

const showCategoriesPage = async (req, res) => {

    const categories = await getAllCategories();

    const title = 'Service Categories';

    res.render('categories', {
        title,
        categories
    });
};

const showCategoryDetailsPage = async (req, res) => {

    const { id } = req.params;

    const category = await getCategoryById(id);

    const projects = await getProjectsByCategoryId(id);

    if (!category) {
        return res
            .status(404)
            .send('Category not found');
    }

    res.render('category', {
        title: category.name,
        category,
        projects
    });
};

const showNewCategoryForm = async (
    req,
    res
) => {

    const title = 'Create New Category';

    res.render('new-category', {
        title
    });
};

const processNewCategoryForm = async (
    req,
    res
) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    const { name } = req.body;

    try {

        const categoryId =
            await createCategory(name);

        req.flash(
            'success',
            'Category created successfully!'
        );

        res.redirect(`/category/${categoryId}`);

    } catch (error) {

        console.error(error);

        req.flash(
            'error',
            'Error creating category.'
        );

        res.redirect('/new-category');
    }
};

const showEditCategoryForm = async (
    req,
    res
) => {

    const categoryId = req.params.id;

    const category =
        await getCategoryById(categoryId);

    const title = 'Edit Category';

    res.render('edit-category', {
        title,
        category
    });
};

const processEditCategoryForm = async (
    req,
    res
) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(
            '/edit-category/' + req.params.id
        );
    }

    const categoryId = req.params.id;

    const { name } = req.body;

    try {

        await updateCategory(
            categoryId,
            name
        );

        req.flash(
            'success',
            'Category updated successfully!'
        );

        res.redirect(`/category/${categoryId}`);

    } catch (error) {

        console.error(error);

        req.flash(
            'error',
            'Error updating category.'
        );

        res.redirect(
            '/edit-category/' + categoryId
        );
    }
};

const showAssignCategoriesForm = async (
    req,
    res
) => {

    const projectId = req.params.projectId;

    const projectDetails =
        await getProjectDetails(projectId);

    const categories =
        await getAllCategories();

    const assignedCategories =
        await getCategoriesByProjectId(
            projectId
        );

    const title =
        'Assign Categories to Project';

    res.render('assign-categories', {
        title,
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });
};

const processAssignCategoriesForm = async (
    req,
    res
) => {

    const projectId = req.params.projectId;

    const selectedCategoryIds =
        req.body.categoryIds || [];

    const categoryIdsArray =
        Array.isArray(selectedCategoryIds)
            ? selectedCategoryIds
            : [selectedCategoryIds];

    await updateCategoryAssignments(
        projectId,
        categoryIdsArray
    );

    req.flash(
        'success',
        'Categories updated successfully.'
    );

    res.redirect(`/project/${projectId}`);
};

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    categoryValidation
};