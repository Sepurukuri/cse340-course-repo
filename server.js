import flash from './src/middleware/flash.js';

import session from 'express-session';

import 'dotenv/config';

import { testConnection } from './src/models/db.js';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import router from './src/routes.js';

const SESSION_SECRET =
process.env.SESSION_SECRET;

const NODE_ENV =
process.env.NODE_ENV?.toLowerCase()
|| 'production';

const app = express();

const PORT =
process.env.PORT || 3000;

const __filename =
fileURLToPath(import.meta.url);

const __dirname =
path.dirname(__filename);

//
// View Engine
//

app.set(
'view engine',
'ejs'
);

app.engine(
'ejs',
(await import('ejs')).renderFile
);

//
// Body Parsers
//

app.use(
express.urlencoded({
extended: true
})
);

app.use(
express.json()
);

//
// Static Files
//

app.use(
express.static(
path.join(
__dirname,
'public'
)
)
);

//
// Session Management
//

app.use(
session({
secret: SESSION_SECRET,
resave: false,
saveUninitialized: true,
cookie: {
maxAge:
60 * 60 * 1000
}
})
);

//
// Flash Messages
//

app.use(
flash
);

//
// Global Variables Available to All Views
//

app.use((req, res, next) => {

res.locals.currentYear =
    new Date().getFullYear();

res.locals.isLoggedIn =
    false;

if (
    req.session &&
    req.session.user
) {

    res.locals.isLoggedIn =
        true;
}

res.locals.user =
    req.session.user || null;

res.locals.NODE_ENV =
    NODE_ENV;

next();

});

//
// Development Logging
//

app.use((req, res, next) => {

if (
    NODE_ENV === 'development'
) {

    console.log(
        `${req.method} ${req.url}`
    );
}

next();

});

//
// Routes
//

app.use(
router
);

//
// 404 Handler
//

app.use((req, res, next) => {

const err =
    new Error(
        'Page Not Found'
    );

err.status = 404;

next(err);

});

//
// Global Error Handler
//

app.use((
err,
req,
res,
next
) => {

console.error(
    'Error occurred:',
    err.message
);

console.error(
    err.stack
);

const status =
    err.status || 500;

const template =
    status === 404
        ? '404'
        : '500';

res.status(status).render(
    `errors/${template}`,
    {
        title:
            status === 404
                ? 'Page Not Found'
                : 'Server Error',

        error:
            err.message,

        stack:
            err.stack
    }
);


});

//
// Start Server
//

app.listen(
PORT,
async () => {

    try {

        await testConnection();

        console.log(
            `Server is running at http://127.0.0.1:${PORT}`
        );

        console.log(
            `Environment: ${NODE_ENV}`
        );

    } catch (error) {

        console.error(
            'Error connecting to the database:',
            error
        );
    }
}

);
