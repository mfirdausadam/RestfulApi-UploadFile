var Pool = require("pg").Pool;
var pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "learn_nodejs_restfulapi",
  password: "postgres",
  port: 5432,
});

module.exports = pool;
