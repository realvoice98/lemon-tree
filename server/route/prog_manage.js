const express = require('express');
const router = express.Router();
const db = require('./db');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

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

router.post('/admin/prog_manage/add_date', (req, res) => {
  // POST 요청의 데이터는 req.body 객체를 통해 접근 가능
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  db.query('INSERT INTO operating_date (start_date, end_date) VALUES (?, ?)', [startDate, endDate], (error, results, fields) => {
    if (error) {
      console.error('데이터 추가 오류: ' + error);
      res.status(500).json({ message: '데이터 추가 중 오류 발생' });
    } else {
      res.json({ message: '운영날짜가 설정되었습니다.' });
    }
  });
});

module.exports = router;