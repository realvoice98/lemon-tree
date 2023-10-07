const express = require('express');

const router = express.Router();

router.get('/admin/prog_manage', (req, res) => {
    res.render('prog_manage');
  })

module.exports = router;