'use strict';

// Modules
require ("dotenv").config();

const {
    database,
    server,
    errorHandler,
} = require("./loaders");

(async () => {
    // create db
    await database.start();

    // create/init server
    const app = server.create();
    await server.start(app);

    // create error handler
    errorHandler.create();
})();