const crypto = require("crypto");

module.exports.generateResetToken = () => {
    const resetToken = crypto.randomBytes(20).toString("hex");
    return resetToken;
}
