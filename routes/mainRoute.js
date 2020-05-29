const express = require('express');
const router = express.Router();

const main_controller = require('../controllers/mainController');

router.get('/', main_controller.restore);

router.post('/game/reset', main_controller.reset);
router.post('/game/update', main_controller.update);

router.get('/game/restore', main_controller.restoreFrontend);

module.exports = router