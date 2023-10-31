const express = require('express');
const router = express.Router();
const db = require('../db');
const bodyParser = require('body-parser')
const cors = require('cors');
router.use(cors());
router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.get('/operatingdate', (req,res) => {
  db.query(
    'SELECT * FROM operating_date ORDER BY id DESC LIMIT 1',
    (error, rows) => {
        if (error) throw error;
        res.send(rows);
    });
});

router.post('/ableTime', (req,res) => {
    const date = req.body.trimmedDate;
    const reservation_status = '예약확정';
    const reservation_status1 = '결제완료';
    
    db.query(
      'SELECT reservation_time FROM reservations_details WHERE reservation_date = ? AND (reservation_status = ? OR reservation_status = ?) GROUP BY reservation_time HAVING COUNT(*) >= 2',
      [date, reservation_status,reservation_status1],
      (error, rows) => {
          if (error) throw error;
          res.send(rows);
      });
  });

  router.post('/reservation', (req, res) => {
    const remain_data = parseInt(req.body.prog_count,10);
   
     const client_id = req.body.client_id;
     const name = req.body.name;
     const phone = req.body.phone;
     const gender = req.body.gender;
     const std = req.body.std;
     const prog_name = req.body.prog_name;
     const prog_time  = req.body.prog_time;
     const remain_count = remain_data - 1;
     const total_count = req.body.prog_count;
     const note = req.body.note;
     const reservation_date = req.body.reservation_date;
     const reservation_time = req.body.reservation_time;
     const price = req.body.price;
     const discount = req.body.discount;
     const reservation_status = req.body.reservation_status;
   
     // 먼저 이미 해당 조건을 만족하는 데이터가 있는지 확인
db.query(
    "SELECT 1 FROM reservations WHERE client_id = ? AND prog_name = ? AND prog_time = ?",
    [client_id, prog_name, prog_time],
    (err, result) => {
      if (err) {
        res.status(500).send("데이터베이스 오류");
      } else {
        if (result.length === 0) {
          // 해당 조건을 만족하는 데이터가 없을 경우에만 INSERT 실행
          db.query(
            "INSERT INTO reservations (client_id, name, phone, gender, std, prog_name, prog_time , remain_count,total_count, note, reservation_date,reservation_time, price, discount, reservation_status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
            [client_id, name, phone, gender, std, prog_name, prog_time, remain_count, total_count, note, reservation_date, reservation_time, price, discount, reservation_status],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                  res.send("성공")
                }
            }
        );
        } else {
          res.send("1");
        }
      }
    }
  );
})




router.post('/reservations_details', (req, res) => {
     const remain_data = parseInt(req.body.prog_count,10);
     const client_id = req.body.client_id;
     const name = req.body.name;
     const phone = req.body.phone;
     const gender = req.body.gender;
     const std = req.body.std;
     const prog_name = req.body.prog_name;
     const prog_time  = req.body.prog_time;
     const remain_count = remain_data;
     const total_count = req.body.prog_count;
     const note = req.body.note;
     const reservation_date = req.body.reservation_date;
     const reservation_time = req.body.reservation_time;
     const price = req.body.price;
     const discount = req.body.discount;
     const reservation_status = req.body.reservation_status;
   
   
     db.query(
         "INSERT INTO reservations_details (client_id, name, phone, gender, std, prog_name, prog_time , remain_count,total_count, note, reservation_date,reservation_time, price, discount, reservation_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
         [client_id, name, phone, gender, std, prog_name, prog_time, remain_count, total_count, note, reservation_date, reservation_time, price, discount, reservation_status],
         (err, result) => {
             if (err) {
                 console.log(err);
             } else {
                 res.send("reservation 성공")
             }
         }
     )
   })

module.exports = router;