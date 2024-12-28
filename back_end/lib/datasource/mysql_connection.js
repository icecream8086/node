var mysql = require('mysql2');
var connect_conf = require('../../config');
// 创建数据库连接
var connection = mysql.createConnection({
  host: connect_conf.my_sql.host,      // 数据库主机名
  user: connect_conf.my_sql.user,   // 数据库用户名
  password: connect_conf.my_sql.password,   // 数据库密码
  database: connect_conf.my_sql.database    // 数据库名称
});

// 连接到数据库
connection.connect(function (err) {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Mysql Connected to database as threadId ' + connection.threadId);
});

// 导出数据库连接
module.exports = connection;
