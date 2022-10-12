const connection = require('../app/database')

class CommentService {
    async create (momentId, content, userId) {
        const statement = `INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?);`
        const [result] = await connection.execute(statement, [content, momentId, userId])
        return result;
    }
    async reply (momentId, content, userId, commentId) {
        const statement = `INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES (?,?,?,?);`
        const [result] = await connection.execute(statement, [content, momentId, userId, commentId])
        return result;
    }
    async update (commentId, content) {
        const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
        const [result] = await connection.execute(statement, [content, commentId]);
        return result;
    }
    async remove (commentId) {
        const statement = `DELETE from comment where id = ?;`;
        const [result] = await connection.execute(statement, [commentId]);
        return result;
    }
    async getComentsByMomentId (commentId) {
        const statement = `	select 
            m.id,m.content,m.comment_id commentId,m.createAt createTime,
            JSON_OBJECT('id',u.id,'name',u.name) user
            from comment m
            LEFT JOIN users u ON u.id = m.user_id
            where moment_id = 1;`;
        const [result] = await connection.execute(statement, [commentId]);
        return result;
    }
}

module.exports = new CommentService();