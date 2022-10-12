// 引入在database文件中创建的连接池 导出的是promise类型
const connection = require('../app/database');

class UserService {
    // 新建用户
    async create (user) {
        const { name, password } = user;
        const statement = `INSERT INTO users (name,password) VALUES (?,?);`;
        // 使用execute插入数据，前面是语句，后面是问号的匹配值。
        const result = await connection.execute(statement, [name, password]);
        //将user存储到数据库中   
        return result[0];
    }
    // 查询用户是否存在
    async getUserByName (name) {
        const statement = `SELECT * from users where name = ?;`;
        const result = await connection.execute(statement, [name]);
        return result[0];
    }

    // 保存用户上传的图片
    async updateAvatarUrlById (userId, avatarUrl) {
        const statement = `UPDATE users SET avatar_url = ? where id = ?;`;
        const [result] = await connection.execute(statement, [avatarUrl, userId]);
        return result;
    }
}


module.exports = new UserService();