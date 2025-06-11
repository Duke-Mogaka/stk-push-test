const express = require('express');
const router = express.Router();
const { initiateSTKPush } = require('../controllers/stk.controller');

router.post('/stkpush', initiateSTKPush);

module.exports = router;