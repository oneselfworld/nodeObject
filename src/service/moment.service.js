const connection = require('../app/database');

// 相同的sql片段进行抽取。
const sqlFragment = `
    SELECT 
        m.id id,m.content content,m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name) user,
        (select COUNT(*) from comment c where c.moment_id = m.id) commentCount,
            (select COUNT(*) from moment_label ml where ml.moment_id = m.id) labelCount,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename)) FROM file WHERE m.id = file.moment_id) images
        from moment m
        LEFT JOIN users u ON m.user_id = u.id`

class MomentService {
    // 创建动态
    async create (userId, content) {
        const statement = `insert into moment (content,user_id) VALUES (?,?);`;
        const [result] = await connection.execute(statement, [content, userId]);
        return result;
    }
    // 获取单个动态
    async getMomentById (id) {
        const statement = ` 
        ${sqlFragment}
        WHERE m.id = ?;`
        const [result] = await connection.execute(statement, [id]);
        return result[0];
    }
    // 获取动态列表
    async getMomentList (offset, size) {
        const statement = ` 
        ${sqlFragment}
        LIMIT ?,?;`
        const [result] = await connection.execute(statement, [offset, size]);
        return result;
    }
    // 更新动态内容
    async update (content, momentId) {
        const statement = `UPDATE moment set content = ? where id = ?;`;
        const [result] = await connection.execute(statement, [content, momentId]);
        return result;
    }
    // 删除动态
    async remove (momentId) {
        const statement = `DELETE FROM moment where id = ?; `;
        const [result] = await connection.execute(statement, [momentId]);
        return result;
    }

    // 
    async hasLabel (momentId, labelId) {
        const statement = `select * from moment_label where moment_id = ? and label_id = ?;`;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return result[0] ? true : false;
    }

    async addLabel (momentId, labelId) {
        const statement = `insert into moment_label (moment_id,label_id) values (?,?);`;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return result;
    }

}

module.exports = new MomentService();