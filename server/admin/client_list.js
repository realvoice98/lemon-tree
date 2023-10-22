const express = require('express');
const router = express.Router();
const db = require('../db');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// 한 페이지당 아이템 수
const itemsPerPage = 15;

// 미들웨어 설정 및 라우터 설정
router.get('/admin/client_list', (req, res) => {
    const currentPage = req.query.page || 1; // 현재 페이지 번호
    const startIndex = (currentPage - 1) * itemsPerPage; // 데이터베이스에서 가져올 항목의 시작 인덱스

    // 전체 데이터 수를 가져오는 쿼리
    const totalQuery = 'SELECT COUNT(*) AS total FROM client';
    // 현재 페이지에 해당하는 데이터를 가져오는 쿼리
    const dataQuery = 'SELECT * FROM client ORDER BY id LIMIT ? OFFSET ?';

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

            res.render('client_list', { clients: results, currentPage, totalPages });
        });
    });
});

router.get('/admin/client_list/client_search', (req, res) => {
  const currentPage = req.query.page || 1; // 현재 페이지 번호
  const startIndex = (currentPage - 1) * itemsPerPage; // 데이터베이스에서 가져올 항목의 시작 인덱스

  // 전체 데이터 수를 가져오는 쿼리
  const totalQuery = 'SELECT COUNT(*) AS total FROM client where name like ? or phone like ?';
  // 현재 페이지에 해당하는 데이터를 가져오는 쿼리
  const dataQuery = 'SELECT * FROM client where name like ? or phone like ? ORDER BY id LIMIT ? OFFSET ?';

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

          res.render('client_search', { clients: results, currentPage, totalPages, searchData });
      });
  });
});

module.exports = router;
