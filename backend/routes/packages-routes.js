

const express = require('express');
const packageController = require('../controller/package-controller');

const router = express.Router();


router.get('/', packageController.listPackage);





module.exports = router;
