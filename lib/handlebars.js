const { format } = require('timeago.js');
const multiparty = require('connect-multiparty')
const mimeTypes = require('mime-types');

const helpers = {};

helpers.timeago = (timestamp) => {
    return format(timestamp);
}


helpers.mutiPartMiddleware = multiparty({
    uploadDir: './images'
});


// helpers.storage = multer.diskStorage({
//     destination: '/images',
//     filename: function (req, file, cb) {
//         cb("", Date.now() + file.originalname);
//     },

// });
// helpers.upload = multer({
//     storage: helpers.storage,
// });


module.exports = helpers;
