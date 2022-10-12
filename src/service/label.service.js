const connection = require('../app/database');

class LabelService {
    // 创建标签
    async create (name) {
        const statement = `INSERT INTO label (name) values (?);`;
        const [result] = await connection.execute(statement, [name]);
        return result;
    }

    // 判断表圈是否存在
    async getLabelByName (name) {
        const statement = `select * from label where name = ?;`;
        const [result] = await connection.execute(statement, [name]);
        return result;
    }

    // 
    async getLabels (size, offset) {
        const statement = `select * from label limit ?,?;`;
        const [result] = await connection.execute(statement, [offset, size]);
        return result;
    }


}

module.exports = new LabelService();