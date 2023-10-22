const express = require('express');
const router = express.Router();
const db = require('../db');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const itemsPerPage = 15;

router.get('/admin/reservation_manage', (req, res) => {
  const currentPage = req.query.page || 1; // 현재 페이지 번호
  const startIndex = (currentPage - 1) * itemsPerPage; // 데이터베이스에서 가져올 항목의 시작 인덱스

  // 전체 데이터 수를 가져오는 쿼리
  const totalQuery = 'SELECT COUNT(*) AS total FROM reservations';
  // 현재 페이지에 해당하는 데이터를 가져오는 쿼리
  const dataQuery = 'SELECT * FROM reservations ORDER BY id DESC LIMIT ? OFFSET ?';

  db.query(totalQuery, (error, totalResults) => {
    if (error) {
        console.error('쿼리 실행 오류: ' + error);
        res.status(500).send('서버 오류');
        return;
    }

    const totalItems = totalResults[0].total;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    db.query(dataQuery, [itemsPerPage, startIndex], (error, results) => {
        if (error) {
            console.error('쿼리 실행 오류: ' + error);
            res.status(500).send('서버 오류');
            return;
        }

        res.render('reservation_manage', { reservations: results, currentPage, totalPages });
    });
  });
});

router.get('/admin/reservation_manage/search', (req, res) => {
  const currentPage = req.query.page || 1; // 현재 페이지 번호
  const startIndex = (currentPage - 1) * itemsPerPage; // 데이터베이스에서 가져올 항목의 시작 인덱스

  // 전체 데이터 수를 가져오는 쿼리
  const totalQuery = 'SELECT COUNT(*) AS total FROM reservations where name like ? or phone like ?';
  // 현재 페이지에 해당하는 데이터를 가져오는 쿼리
  const dataQuery = 'SELECT * FROM reservations where name like ? or phone like ? ORDER BY id DESC LIMIT ? OFFSET ?';

  const searchData = req.query.searchData;

  db.query(totalQuery, ['%' + searchData + '%', '%' + searchData + '%'], (error, totalResults) => {
    if (error) {
        console.error('쿼리 실행 오류: ' + error);
        res.status(500).send('서버 오류');
        return;
    }

    const totalItems = totalResults[0].total;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    db.query(dataQuery, ['%' + searchData + '%', '%' + searchData + '%', itemsPerPage, startIndex], (error, results) => {
        if (error) {
            console.error('쿼리 실행 오류: ' + error);
            res.status(500).send('서버 오류');
            return;
        }

        res.render('search', { reservations: results, currentPage, totalPages, searchData }); // searchData를 전달하여 검색어를 유지합니다.
    });
  });
});



  router.post('/admin/reservation_manage/confirm_reserv', (req, res) => {
    const id = req.body.id;

    db.query("update reservations set reservation_status = '예약완료'  where id = ?", [id], (error, results, fields) => {
      if (error) {
        console.error('데이터 수정 오류: ' + error);
        res.status(500).json({ message: '오류 발생' });
      } else {
        res.json({ message: '예약이 확정되었습니다.' });
      }
    });
  });

  router.post('/admin/reservation_manage/cancel_reserv', (req, res) => {
    const id = req.body.id;

    db.query("update reservations set reservation_status = '예약취소'  where id = ?", [id], (error, results, fields) => {
      if (error) {
        console.error('데이터 수정 오류: ' + error);
        res.status(500).json({ message: '오류 발생' });
      } else {
        res.json({ message: '예약이 취소되었습니다.' });
      }
    });
  });

  router.post('/admin/reservation_manage/payment_reserv', (req, res) => {
    const id = req.body.id;
    const discount = req.body.discount;

    db.query("update reservations set reservation_status = '결제완료', discount = ?  where id = ?", [discount, id], (error, results, fields) => {
      if (error) {
        console.error('데이터 수정 오류: ' + error);
        res.status(500).json({ message: '오류 발생' });
      } else {
        res.json({ message: '결제되었습니다.' });
      }
    });
  });

  router.post('/admin/reservation_manage/modify_reserv', (req, res) => {
    const id = req.body.id;
    const note = req.body.note;
    const std = req.body.std;
    const discount = req.body.discount;

    db.query("update reservations set note = ?, std = ?, discount = ?  where id = ?", [note, std, discount, id], (error, results, fields) => {
      if (error) {
        console.error('데이터 수정 오류: ' + error);
        res.status(500).json({ message: '오류 발생' });
      } else {
        res.json({ message: '수정되었습니다.' });
      }
    });
  });


module.exports = router;