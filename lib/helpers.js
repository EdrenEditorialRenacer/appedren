const bcrypt = require('bcryptjs');
const passport = require('passport');
const helpers = {};

helpers.encryptPassword = async (password) => {
return bcrypt.hashSync(password,bcrypt.genSaltSync(10));  
};

helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.log(error);
    }


};


module.exports = helpers;