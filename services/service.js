
const keyword = require('../model/keywords.model');

exports.saveKeyword = (req) => {
    let newKeyword = new keyword({
        name: req.keywordName
    });

    try {
        return newKeyword.save();
    }
    catch(e) {
        console.log('saving failed');
    }
}

exports.getKeywordByName = (name) => {
    return keyword.findOne({name: name});
}