var express = require('express');
var router = express.Router();
const query = require('../lib/datasource/mysql_connection_promise');  // Database connection


router.get('/', async function(req, res, next) {
  const result = await query({
    sql: `select * from Users;`,
  });
  let results = JSON.parse(JSON.stringify(result));
  
  res.send(results);
  console.log(results);
  
});

module.exports = router;
