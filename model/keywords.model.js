const mongoose = require('mongoose');


const keyWordSchema = new mongoose.Schema({
    name: String,
})

const keyword = mongoose.model('keyword', keyWordSchema);

module.exports = keyword;