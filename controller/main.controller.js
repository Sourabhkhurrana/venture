const Jimp = require("jimp");
const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');
const url = require('../config').Google_URL;

const service = require('../services/service');
const promise = [];

exports.saveKeyword = async (req, res, next) => {
    try {
        const result = await service.saveKeyword(req.body);
        loadImagesToServer(req.body.keywordName);

        return Promise.all(promise).then(() => {
            return res.status(200).json(result);
        })
    }
    catch (e) {
        console.log("error occured", e);
        return res.status(400).json(e);
    }
}

exports.getkeywordByName = (req, res, next) => {
    try {
        return service.getKeywordByName(req.params.name).then((result) => {
            return res.status(200).json(result);
        })
    }
    catch (e) {
        console.log("Error occured: getKeywordByName")
        return res.status(400).json(e);
    }
}


function loadImagesToServer(keyword) {

    var google_URL = url.replace("keyWord", keyword);

    request(google_URL, (error, response, html) => {
        if (error) return console.log("Error in html", error);

        const $ = cheerio.load(html);
        $('img').each(function (index) {
            //loading images to files

            // request.head($(this).attr('src'), function (err, res, body) {
            //     request($(this).attr('src')).pipe(fs.createWriteStream(keyword + index));
            // });
            if (index < 15)
                promise.push(processImage($(this).attr('src'), keyword, index));
            else
                return false
        });
    });
}

function processImage(url, keyword, index) {
    Jimp.read(url).then(function (image) {
        return image.resize(150, 100)      // resize the image to 150 X 100
            .quality(90)                 // set image quality
            .greyscale()                 // set greyscale
            .write("public/images/" + keyword + '/' + keyword + index + ".jpg"); // save to local HDD
    }).catch(function (err) {
        console.error(err);
    });
}