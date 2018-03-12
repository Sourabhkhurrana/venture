const express = require('express');
const router = express.Router();

// router.get('/getEmail/:email', loginController.getEmail);

const mainCtrl = require('../controller/main.controller');
const keywordCtrl = require('../controller/keyword.controller');

router.post('/saveKeyword', mainCtrl.saveKeyword);

router.get('/getKeywordByName/:name', mainCtrl.getkeywordByName);


router.post('/loadImagesToServer', mainCtrl.loadImagesToServer);

// get all keywords from database
router.get('/getAllKeywords', keywordCtrl.getAllKeywords);


module.exports = router;