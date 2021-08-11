const { Router } = require('express');

const {
    cronGet,
    cronPost
} = require('../controllers/cron');

const router = Router();

router.get('/', cronGet);
router.post('/', cronPost);

module.exports = router;