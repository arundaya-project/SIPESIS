const express = require('express');
const router = express.Router();
const laporanController = require('../controller/laporanController');

router.post('/', laporanController.createLaporan);
router.get('/', laporanController.getAllLaporan);
router.get('/history', laporanController.getLaporanHistory);
router.get('/:id', laporanController.getLaporanById);
router.put('/:id', laporanController.updateLaporan);
router.delete('/:id', laporanController.deleteLaporan);

module.exports = router;
