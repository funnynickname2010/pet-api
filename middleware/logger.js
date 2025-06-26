'use strict';

const logger = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next(); // Pass control to next middleware or route handler
};

module.exports = logger;