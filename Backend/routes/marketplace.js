const express = require('express');
const router = express.Router();
const { list, create } = require('../controllers/marketplaceController');
const auth = require('../middleware/auth');

router.get('/', auth.optional, list);
router.post('/', auth.required, create);

module.exports = router;
