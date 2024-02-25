const bcrypt = require('bcryptjs');

const passwordUtil = {
    // Hashes a password
    async hashPassword(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
            return hashedPassword;
        } catch (error) {
            console.error('Error hashing password:', error);
            throw error;
        }
    },

    // Compares a password with a hash
    async comparePassword(password, hash) {
        try {
            const result = await bcrypt.compare(password, hash);
            return result; // Returns true if the password matches the hash, false otherwise
        } catch (error) {
            console.error('Error comparing password with hash:', error);
            throw error;
        }
    }
};

module.exports = passwordUtil;
