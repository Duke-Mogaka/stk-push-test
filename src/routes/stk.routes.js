const express = require('express');
const router = express.Router();
const { initiateSTKPush } = require('../controller/stk.controller.js');

router.post('/stkpush', initiateSTKPush);

module.exports = router;