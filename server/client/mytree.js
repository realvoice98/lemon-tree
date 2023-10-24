const express = require('express');
const router = express.Router();
const db = require('../db');
const bodyParser = require('body-parser')
const cors = require('cors');
router.use(cors());
router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.get('/myTree', (req, res) => {
  const client_id = req.query.client_id;

  db.query(
    'SELECT * FROM reservations WHERE client_id = ?',
    [client_id],
    (error, rows) => {
        if (error) throw error;
        res.send(rows);
    });
});

router.get('/myReservation', (req, res) => {
  const client_id = req.query.client_id;

  db.query(
    'SELECT * FROM reservations WHERE client_id = ? AND (reservation_status = "예약완료" OR reservation_status = "예약대기")',
    [client_id],
    (error, rows) => {
        if (error) throw error;
        res.send(rows);
    });
});

router.get('/reservationList', (req, res) => {
  const client_id = req.query.client_id;

  db.query(
    'SELECT * FROM reservations WHERE client_id = ? AND (reservation_status = "결제완료" OR reservation_status = "취소완료")',
    [client_id],
    (error, rows) => {
        if (error) throw error;
        res.send(rows);
    });
});

module.exports = router;