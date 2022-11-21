const Pool = require("pg").Pool;
exports.pool = new Pool({
  user: "postgres",
  host: "renalreg.clwq0x2qxrua.af-south-1.rds.amazonaws.com",
  database: "renalregistry_testDB",
  password: "digitalhealth$$7",
  port: 5432,
});
