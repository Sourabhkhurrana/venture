var Scraper = require ('images-scraper');
var google = new Scraper.Google();

const Jimp = require("jimp");

const service = require('../services/service');

exports.saveKeyword = async (req, res, next) => {
    try {
        const result = await service.saveKeyword(req.body);
        return res.status(200).json(result);
    }
    catch (e) {
        console.log("error occured", e);
        return res.status(400).json(e);
    }
}

exports.getkeywordByName = async (req, res, next) => {
    try {
        return service.getKeywordByName(req.params.name).then((result) => {
            return res.status(200).json(result);
        })
    }
    catch (e) {
        return res.status(400).json(e);
    }
}

exports.loadImagesToServer = (req, res) => {
    google.list({
        keyword: req.body.keywordName,
        num: 10,
        detail: true,
    })
    .then(function (response) {
        console.log('first 10 results from google');
        for(let url in response){
            processImage(response[url].url, req.body.keywordName, url);
        }
    }).then(function(d) {
        return res.json({flag: 1});
    }).catch(function(err) {
        console.log('err', err);
    });
}

function processImage(url, keyword, index) {
    Jimp.read(url).then(function (lenna) {
        lenna.resize(500, 500)            // resize
             .quality(90)                 // set JPEG quality
             .greyscale()                 // set greyscale
             .write("public/images/" + keyword + '/' + index + ".jpg"); // save
      }).catch(function (err) {
          console.error(err);
      });
}