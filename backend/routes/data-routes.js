

const express = require('express');
const dataController = require('../controller/data-controller');

const router = express.Router();


router.get('/packages', dataController.listPackage);

router.post('/login',dataController.login);



module.exports = router;
