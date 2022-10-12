const mysql = require('mysql2');
//导入环境变量
const config = require('./config');

// 创建连接池
const connections = mysql.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    database: config.MYSQL_DATABASE,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD

})

connections.getConnection((err, conn) => {
    conn.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('数据库连接：success')
        }
    })
})

module.exports = connections.promise();