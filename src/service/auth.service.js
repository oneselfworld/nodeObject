const connection = require('../app/database')

class AuthService {
    async checkResource (tableName, resourceId, id) {
        const statement = `select * from ${tableName} where id = ? AND user_id = ?;`
        const [result] = await connection.execute(statement, [resourceId, id]);

        return result.length === 0 ? false : true;
    }
}

module.exports = new AuthService();