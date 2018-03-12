
const keywordService = require('../services/keywordService');

exports.getAllKeywords = async (req, res, next) => {
    try {
        return keywordService.getKeywords(res).then(function(result){
            return res.status(200).json(result);
        });
    }
    catch (e){
        console.log("Error in keywordsController: getKeywords" + e);
        return res.status(500).json({error: e});
    }
}
