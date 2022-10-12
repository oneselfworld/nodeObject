const jwt = require('jsonwebtoken');

const { PRIVATE_KEY } = require('../app/config');
class AuthController {
    async login (ctx, next) {
        const { name, id } = ctx.user;

        const token = jwt.sign({ name, id }, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm: 'RS256'
        })

        ctx.body = { id, name, token };
    }

    async success (ctx, next) {
        ctx.body = '验证通过';
    }
}

module.exports = new AuthController();