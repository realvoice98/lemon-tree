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
    const reservation_status = '예약대기';
    const reservation_status1 = '예약확정';
    
    db.query(
      'SELECT reservation_time FROM reservations_details WHERE reservation_date = ? AND (reservation_status = ? OR reservation_status = ?) GROUP BY reservation_time HAVING (COUNT(*) >= 2 OR (reservation_time = "18 : 30" AND COUNT(*) >= 1))',
      [date, reservation_status,reservation_status1],
      (error, rows) => {
          if (error) throw error;
          res.send(rows);
      });
  });

router.post('/reservation', (req, res) => {
    const remain_data = parseInt(req.body.prog_count, 10);

    const client_id = req.body.client_id;
    const name = req.body.name;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const std = req.body.std;
    const prog_name = req.body.prog_name;
    const prog_time = req.body.prog_time;
    const remain_count = remain_data - 1;
    const total_count = req.body.prog_count;
    const note = req.body.note;
    const reservation_date = req.body.reservation_date;
    const reservation_time = req.body.reservation_time;
    const price = req.body.price;
    const discount = req.body.discount;
    const reservation_status = req.body.reservation_status;

    let maxRowCount = 2; // 기본값

    // reservation_time이 "18 : 30"인 경우 최대 수용 인원을 1로 설정
    if (reservation_time === "18 : 30") {
        maxRowCount = 1;
    }
    db.query(
        "SELECT COUNT(*) as rowCount FROM reservations_details WHERE reservation_date = ? AND reservation_time = ?",
        [reservation_date, reservation_time],
        (err, result) => {
            if (err) {
                console.log(err);
                // 에러 처리
            } else {
                const rowCount = result[0].rowCount;

                if (rowCount < maxRowCount) {
                    db.query(
                        "INSERT INTO reservations (client_id, name, phone, gender, std, prog_name, prog_time , remain_count,total_count, note, reservation_date,reservation_time, price, discount, reservation_status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
                        [client_id, name, phone, gender, std, prog_name, prog_time, remain_count, total_count, note, reservation_date, reservation_time, price, discount, reservation_status],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                const insertedId = result.insertId;
                                res.send(insertedId.toString());
                            }
                        }
                    );
                } else {
                    // 예약한 기간, 시간에 2명이 있을경우 1 반환 
                    res.send("1")

                }
            }
        }
    );
});




router.post('/reservations_details', (req, res) => {
    const remain_data = parseInt(req.body.prog_count, 10);
    const client_id = req.body.client_id;
    const reservation_id = req.body.reservation_id;
    const name = req.body.name;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const std = req.body.std;
    const prog_name = req.body.prog_name;
    const prog_time = req.body.prog_time;
    const remain_count = remain_data;
    const total_count = req.body.prog_count;
    const note = req.body.note;
    const reservation_date = req.body.reservation_date;
    const reservation_time = req.body.reservation_time;
    const price = req.body.price;
    const discount = req.body.discount;
    const reservation_status = req.body.reservation_status;

    let maxRowCount = 2; // 기본값

    // reservation_time이 "18 : 30"인 경우 최대 수용 인원을 1로 설정
    if (reservation_time === "18 : 30") {
        maxRowCount = 1;
    }
    db.query(
        "SELECT COUNT(*) as rowCount FROM reservations_details WHERE reservation_date = ? AND reservation_time = ?",
        [reservation_date, reservation_time],
        (err, result) => {
            if (err) {
                console.log(err);
                // 에러 처리
            } else {
                const rowCount = result[0].rowCount;
                if (rowCount < maxRowCount) {
                    console.log(result[0])
                    console.log(result[0].rowCount);
                    // 조건 충족 시에만 데이터를 추가
                    db.query(
                        "INSERT INTO reservations_details (client_id, reservation_id, name, phone, gender, std, prog_name, prog_time, remain_count, total_count, note, reservation_date, reservation_time, price, discount, reservation_status) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
                        [client_id, reservation_id, name, phone, gender, std, prog_name, prog_time, remain_count, total_count, note, reservation_date, reservation_time, price, discount, reservation_status],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                // 에러 처리
                            } else {
                                res.send("reservation 성공");
                            }
                        }
                    );
                } else {
                    // 예약한 기간, 시간에 2명이 있을경우 1 반환 
                    res.send("1")
                    console.log("error다 임마")
                }
            }
        }
    );
})

module.exports = router;