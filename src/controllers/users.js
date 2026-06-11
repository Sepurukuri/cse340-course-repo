import bcrypt from 'bcrypt';

import {
    createUser,
    authenticateUser,
    getAllUsers
} from '../models/users.js';

import {
    getVolunteerProjectsByUserId,
    getVolunteerActivity
} from '../models/projects.js';

const showUserRegistrationForm = (req, res) => {
    res.render('register', {
        title: 'Register'
    });
};

const processUserRegistrationForm = async (req, res) => {

    const {
        name,
        email,
        password
    } = req.body;

    try {

        const salt =
            await bcrypt.genSalt(10);

        const passwordHash =
            await bcrypt.hash(
                password,
                salt
            );

        await createUser(
            name,
            email,
            passwordHash
        );

        req.flash(
            'success',
            'Registration successful! Please log in.'
        );

        res.redirect('/login');

    } catch (error) {

        console.error(error);

        req.flash(
            'error',
            'Registration failed.'
        );

        res.redirect('/register');
    }
};

const showLoginForm = (req, res) => {

    res.render('login', {
        title: 'Login'
    });
};

const processLoginForm = async (req, res) => {

    const {
        email,
        password
    } = req.body;

    try {

        const user =
            await authenticateUser(
                email,
                password
            );

        if (user) {

            req.session.user =
                user;

            req.flash(
                'success',
                'Login successful!'
            );

            console.log(
                'User logged in:',
                user
            );

            return res.redirect(
                '/dashboard'
            );
        }

        req.flash(
            'error',
            'Invalid email or password.'
        );

        res.redirect('/login');

    } catch (error) {

        console.error(error);

        req.flash(
            'error',
            'Login failed.'
        );

        res.redirect('/login');
    }
};

const processLogout = (req, res) => {

    req.session.destroy(() => {

        req.flash(
            'success',
            'Logout successful!'
        );

        res.redirect('/login');
    });
};

const requireLogin = (
    req,
    res,
    next
) => {

    if (
        !req.session ||
        !req.session.user
    ) {

        req.flash(
            'error',
            'You must be logged in to access that page.'
        );

        return res.redirect(
            '/login'
        );
    }

    next();
};

const requireRole = (role) => {

    return (
        req,
        res,
        next
    ) => {

        if (
            !req.session ||
            !req.session.user
        ) {

            req.flash(
                'error',
                'You must be logged in.'
            );

            return res.redirect('/login');
        }

        if (
            req.session.user.role_name !== role
        ) {

            req.flash(
                'error',
                'You do not have permission to access this page.'
            );

            return res.redirect('/dashboard');
        }

        next();
    };
};

const showDashboard = async (
    req,
    res
) => {

    const user =
        req.session.user;

    const volunteerProjects =
        await getVolunteerProjectsByUserId(
            user.user_id
        );

    let volunteerActivity = [];

    if (
        user.role_name === 'admin'
    ) {

        volunteerActivity =
            await getVolunteerActivity();
    }

    res.render(
        'dashboard',
        {
            title: 'Dashboard',
            name: user.name,
            email: user.email,
            volunteerProjects,
            volunteerActivity
        }
    );
};

const showUsersPage = async (
    req,
    res
) => {

    const users =
        await getAllUsers();

    res.render(
        'users',
        {
            title: 'Users',
            users
        }
    );
};

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    requireRole,
    showDashboard,
    showUsersPage
};
