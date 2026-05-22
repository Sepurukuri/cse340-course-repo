import db from './db.js';

const getAllCategories = async () => {

    const query = `
        SELECT
            category_id,
            name
        FROM category
        ORDER BY name;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getCategoryById = async (id) => {

    const query = `
        SELECT
            category_id,
            name
        FROM category
        WHERE category_id = $1;
    `;

    const queryParams = [id];

    const result = await db.query(query, queryParams);

    return result.rows[0];
};

const getProjectsByCategoryId = async (categoryId) => {

    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date,
            p.location
        FROM project p
        JOIN project_category pc
            ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.title;
    `;

    const queryParams = [categoryId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

const getCategoriesByProjectId = async (projectId) => {

    const query = `
        SELECT
            c.category_id,
            c.name
        FROM category c
        JOIN project_category pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;

    const queryParams = [projectId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

export {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    getCategoriesByProjectId
};