const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/admin/prog_manage', (req, res) => {
  db.query('SELECT * FROM programs', (error, results, fields) => {
    if (error) {
      console.error('쿼리 실행 오류: ' + error);
      res.status(500).send('서버 오류');
      return;
    }

    // 프로그램 데이터를 렌더링할 EJS 템플릿에 전달
    res.render('prog_manage', { programs: results });
  });
});

module.exports = router;