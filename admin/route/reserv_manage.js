const express = require('express');

const router = express.Router();

router.get('/admin/reservation_manage', (req, res) => {
    res.render('reservation_manage');
  })

module.exports = router;