const express = require('express');
const router = express.Router();
const siswaController = require('../controller/siswaController');

router.get('/search', siswaController.searchSiswa);

module.exports = router;
