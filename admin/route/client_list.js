const express = require('express');

const router = express.Router();

router.get('/admin/client_list', (req, res) => {
    res.render('client_list');
  })

module.exports = router;