const knexConfig = require("./knexfile");
const knexQuery = require("knex")(knexConfig[process.env.NODE_ENV || "development"]);

module.exports = knexQuery;
