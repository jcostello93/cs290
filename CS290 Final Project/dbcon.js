var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_costejoh',
  password        : '9050',
  database        : 'cs290_costejoh'
});

module.exports.pool = pool;
