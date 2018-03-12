const keyword = require('../model/keywords.model');

exports.getKeywords = (res) => {
    return keyword.find({}, function(err, results) {
        if (err) throw err;
        res.json(results);
      });
}