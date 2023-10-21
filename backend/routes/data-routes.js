
const express = require('express');
const dataController = require('../controller/data-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/login',dataController.login);

router.put('/packages/update',dataController.updatePackage);

router.get('/packages', checkAuth, dataController.listPackage);





module.exports = router;
