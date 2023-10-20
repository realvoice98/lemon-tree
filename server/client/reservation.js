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
    'SELECT * FROM operating_date',
    (error, rows) => {
        if (error) throw error;
        res.send(rows);
    });
});


router.post('/reservation', (req, res) => {
  const client_id = req.body.client_id;
  const name = req.body.name;
  const phone = req.body.phone;
  const gender = req.body.gender;
  const std = req.body.std;
  const prog_name = req.body.prog_name;
  const prog_time  = req.body.prog_time;
  const prog_count = req.body.prog_count;
  const note = req.body.note;
  const reservation_date = req.body.reservation_date;
  const price = req.body.price;
  const discount = req.body.discount;
  const reservation_status = req.body.reservation_status;
  console.log(client_id, name, phone, gender, std, prog_name, prog_time, prog_count, note, reservation_date, price, discount, reservation_status)

  db.query(
      "INSERT INTO reservations (client_id, name, phone, gender, std, prog_name, prog_time , prog_count, note, reservation_date, price, discount, reservation_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [client_id, name, phone, gender, std, prog_name, prog_time , prog_count, note, reservation_date, price, discount, reservation_status],
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