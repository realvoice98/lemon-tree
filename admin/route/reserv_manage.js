const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/admin/reservation_manage', (req, res) => {
    db.query('SELECT * FROM reservations', (error, results, fields) => {
      if (error) {
        console.error('쿼리 실행 오류: ' + error);
        res.status(500).send('서버 오류');
        return;
      }

      res.render('reservation_manage', { reservations: results });
    });
  })

module.exports = router;