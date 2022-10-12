const connection = require('../app/database');

class FileService {
    async createAvatar (filename, mimetype, size, user_id) {
        const statement = `insert into avatar (filename,mimetype,size,user_id) values (?,?,?,?);`;
        const [result] = await connection.execute(statement, [filename, mimetype, size, user_id]);
        return result;
    }

    async getAvatarByUserId (userId) {
        const statement = `select * from avatar where user_id = ?;`
        const [result] = await connection.execute(statement, [userId]);
        return result[0];
    }

    // 保存动态配图
    async createFile (filename, mimetype, size, user_id, momentId) {
        const statement = `insert into file (filename,mimetype,size,user_id,moment_id) values (?,?,?,?,?);`;
        const [result] = await connection.execute(statement, [filename, mimetype, size, user_id, momentId]);
        return result;
    }

    // 查询配图数据
    async getFileByFilename (filename) {
        const statement = `select * from file where filename = ?;`
        const [result] = await connection.execute(statement, [filename]);
        return result[0];
    }
}

module.exports = new FileService();