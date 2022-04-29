const { Router } = require('express');
const router = Router();

// Import Controllers
const PlayersControl = require('../controllers/players.controllers');

// Routes
router.use('/api/players', PlayersControl.playersRouter);

module.exports = router;