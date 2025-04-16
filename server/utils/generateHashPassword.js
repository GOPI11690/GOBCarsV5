const bcryptjs = require('bcryptjs');

module.exports.generateHashPassword = (password) => {
    const hashPassword = bcryptjs.hash(password, 10);
    return hashPassword;
}
