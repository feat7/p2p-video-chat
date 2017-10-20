import express from 'express';

let router = express.Router();

/**
 * Home Page
 */
router.get('/', (req, res, next) => {
    res.render('index');
});

module.exports = router;