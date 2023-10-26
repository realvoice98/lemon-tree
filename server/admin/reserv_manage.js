const express = require('express');
const router = express.Router();
const db = require('../db');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const itemsPerPage = 15;

router.get('/admin/reservation_manage', (req, res) => {
  const currentPage = req.query.page || 1; // 현재 페이지 번호
  const startIndex = (currentPage - 1) * itemsPerPage; // 데이터베이스에서 가져올 항목의 시작 인덱스
  const reserv_status = req.query.reserv_status;

  // 전체 데이터 수를 가져오는 쿼리
  let totalQuery;
  // 현재 페이지에 해당하는 데이터를 가져오는 쿼리
  let dataQuery;
  let totalQueryParameters;
  let dataQueryParameters;

  if (reserv_status == '예약대기') {
    totalQuery = 'SELECT COUNT(*) AS total FROM reservations_details';
    dataQuery = 'SELECT * FROM reservations_details ORDER BY id DESC LIMIT ? OFFSET ?';
    dataQueryParameters = [itemsPerPage, startIndex];
  } else {
    totalQuery = 'SELECT COUNT(*) AS total FROM reservations_list WHERE reservation_status = ?';
    dataQuery = 'SELECT * FROM reservations_list WHERE reservation_status = ? ORDER BY id DESC LIMIT ? OFFSET ?';
    totalQueryParameters = [reserv_status];
    dataQueryParameters = [reserv_status, itemsPerPage, startIndex];
  }

  db.query(totalQuery, totalQueryParameters, (error, totalResults) => {
    if (error) {
      console.error('쿼리 실행 오류: ' + error);
      res.status(500).send('서버 오류');
      return;
    }

    const totalItems = totalResults[0].total;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    db.query(dataQuery, dataQueryParameters, (error, results) => {
      if (error) {
        console.error('쿼리 실행 오류: ' + error);
        res.status(500).send('서버 오류');
        return;
      }

      res.render('reservation_manage', { reservations: results, currentPage, totalPages, reserv_status });
    });
  });
});


router.get('/admin/reservation_manage/search', (req, res) => {
  const currentPage = req.query.page || 1; // 현재 페이지 번호
  const startIndex = (currentPage - 1) * itemsPerPage; // 데이터베이스에서 가져올 항목의 시작 인덱스
  const reserv_status = req.query.reserv_status;
  const searchData = req.query.searchData;

  // 전체 데이터 수를 가져오는 쿼리
  let totalQuery;
  // 현재 페이지에 해당하는 데이터를 가져오는 쿼리
  let dataQuery;
  let totalQueryParameters;
  let dataQueryParameters;

  if (reserv_status == '예약대기') {
    totalQuery = 'SELECT COUNT(*) AS total FROM reservations_details where name like ? or phone like ?';
    dataQuery = 'SELECT * FROM reservations_details where name like ? or phone like ? ORDER BY id DESC LIMIT ? OFFSET ?';
    totalQueryParameters = ['%' + searchData + '%', '%' + searchData + '%'];
    dataQueryParameters = ['%' + searchData + '%', '%' + searchData + '%', itemsPerPage, startIndex];
  } else {
    totalQuery = 'SELECT COUNT(*) AS total FROM reservations_list WHERE reservation_status = ? and (name like ? or phone like ?)';
    dataQuery = 'SELECT * FROM reservations_list WHERE reservation_status = ? and (name like ? or phone like ?) ORDER BY id DESC LIMIT ? OFFSET ?';
    totalQueryParameters = [reserv_status, '%' + searchData + '%', '%' + searchData + '%'];
    dataQueryParameters = [reserv_status, '%' + searchData + '%', '%' + searchData + '%', itemsPerPage, startIndex];
  }

  db.query(totalQuery, totalQueryParameters, (error, totalResults) => {
    if (error) {
        console.error('쿼리 실행 오류: ' + error);
        res.status(500).send('서버 오류');
        return;
    }

    const totalItems = totalResults[0].total;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    db.query(dataQuery, dataQueryParameters, (error, results) => {
        if (error) {
            console.error('쿼리 실행 오류: ' + error);
            res.status(500).send('서버 오류');
            return;
        }

        res.render('search', { reservations: results, currentPage, totalPages, searchData, reserv_status }); // searchData를 전달하여 검색어를 유지합니다.
    });
  });
});



  router.post('/admin/reservation_manage/confirm_reserv', (req, res) => {
    const id = req.body.id;
    const client_id = req.body.client_id;
    const name = req.body.name;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const std = req.body.std;
    const prog_name = req.body.prog_name;
    const prog_time = req.body.prog_time;
    const remain_count = req.body.remain_count;
    const total_count = req.body.total_count;
    const note = req.body.note;
    const reservation_date = req.body.reservation_date;
    const reservation_time = req.body.reservation_time;
    const price = req.body.price;
    
    db.query("insert into reservations_list(client_id, name, phone, gender, std, prog_name, prog_time, remain_count, total_count, note, reservation_date, reservation_time, price, reservation_status) "+
             "values(?,?,?,?,?,?,?,?,?,?,?,?,?,'예약확정')",
              [client_id,name,phone,gender,std,prog_name,prog_time,remain_count,total_count,note,reservation_date,reservation_time,price], (error, results, fields) => {
      if (error) {
        console.error('데이터 삽입 오류: ' + error);
        res.status(500).json({ message: '오류 발생' });
      } else {
        db.query("delete from reservations_details where id = ? ", [id], (error) => {
          if (error) {
            console.error('데이터 삭제 오류: ' + error);
            res.status(500).json({ message: '오류 발생' });
          } else {
            res.json({ message: '예약 확정되었습니다.' });
          }
        });
      }
    });
  });

  router.post('/admin/reservation_manage/cancel_reserv', (req, res) => {
    const id = req.body.id;
    const client_id = req.body.client_id;
    const name = req.body.name;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const std = req.body.std;
    const prog_name = req.body.prog_name;
    const prog_time = req.body.prog_time;
    const remain_count = req.body.remain_count;
    const total_count = req.body.total_count;
    const note = req.body.note;
    const reservation_date = req.body.reservation_date;
    const reservation_time = req.body.reservation_time;
    const price = req.body.price;
    const reservation_status = req.body.reservation_status;

    if(reservation_status == '예약확정'){
        db.query("update reservations_list set reservation_status = '취소완료' where id = ? ", [id], (error) => {
          if (error) {
            console.error('데이터 수정 오류: ' + error);
            res.status(500).json({ message: '오류 발생' });
          } else {
            db.query("update reservations set remain_count = remain_count + 1 where client_id = ? and prog_name = ? and prog_time = ? ", [client_id, prog_name, prog_time], (error) => {
              if (error) {
                console.error('데이터 삭제 오류: ' + error);
                res.status(500).json({ message: '오류 발생' });
              } else {
                res.json({ message: '결제되었습니다.' });
              }
            });
          }
        });
    }else{
      db.query("insert into reservations_list(client_id, name, phone, gender, std, prog_name, prog_time, remain_count, total_count, note, reservation_date, reservation_time, price, reservation_status) "+
             "values(?,?,?,?,?,?,?,?,?,?,?,?,?,'취소완료')",
              [client_id,name,phone,gender,std,prog_name,prog_time,remain_count,total_count,note,reservation_date,reservation_time,price], (error, results, fields) => {
      if (error) {
        console.error('데이터 삽입 오류: ' + error);
        res.status(500).json({ message: '오류 발생' });
      } else {
        db.query("delete from reservations_details where id = ? ", [id], (error) => {
          if (error) {
            console.error('데이터 수정 오류: ' + error);
            res.status(500).json({ message: '오류 발생' });
          } else {
            db.query("update reservations set remain_count = remain_count + 1 where client_id = ? and prog_name = ? and prog_time = ? ", [client_id, prog_name, prog_time], (error) => {
              if (error) {
                console.error('데이터 삭제 오류: ' + error);
                res.status(500).json({ message: '오류 발생' });
              } else {
                res.json({ message: '결제되었습니다.' });
              }
            });
          }
        });
      }
    });
    } 
  });

  router.post('/admin/reservation_manage/payment_reserv', (req, res) => {
    const id = req.body.id;
    const price = req.body.price;
    const prog_name = req.body.prog_name;
    const sale_date = req.body.sale_date;
    const client_id = req.body.client_id;
    const std = req.body.std;
  
    db.query("update reservations set reservation_status = '결제완료', discount = ?, std = ? where client_id = ?", [price, std, client_id], (error, results, fields) => {
      if (error) {
        console.error('데이터 수정 오류: ' + error);
        res.status(500).json({ message: '오류 발생' });
      } else {
        db.query("update client set std = ? where id = ?", [std, client_id], (error, results, fields) => {
          if (error) {
            console.error('데이터 삽입 오류: ' + error);
            res.status(500).json({ message: '오류 발생' });
          } else {
            db.query("insert into sales (sale_date, prog_name, price) values(?, ?, REPLACE(?, ',', ''))", [sale_date, prog_name, price], (error, results, fields) => {
              if (error) {
                console.error('데이터 삽입 오류: ' + error);
                res.status(500).json({ message: '오류 발생' });
              } else {
                res.json({ message: '결제되었습니다.' });
              }
            });
          }
        });
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