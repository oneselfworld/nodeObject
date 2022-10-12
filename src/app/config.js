const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));

//这样直接导出env对象。
module.exports = process.env;
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;