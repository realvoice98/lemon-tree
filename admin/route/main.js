const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/admin/main', (req, res) => {
  // 현재 날짜 생성
  const today = new Date();

  // 년, 월, 일 각각 가져오기
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  // 날짜를 'yy.mm.dd' 형식으로 변환
  const formattedToday = `${year}.${month}.${day}`;

  // 내일 날짜 생성
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // 년, 월, 일 각각 가져오기
  const nextYear = tomorrow.getFullYear().toString().slice(-2);
  const nextMonth = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
  const nextDay = tomorrow.getDate().toString().padStart(2, '0');

  // 내일 날짜를 'yy.mm.dd' 형식으로 변환
  const formattedTomorrow = `${nextYear}.${nextMonth}.${nextDay}`;

  let todayReservations, tomorrowReservations;

  // 오늘 예약 정보 조회
  db.query("SELECT * FROM reservations WHERE reservation_date = ?" , [formattedToday],(error, results, fields) => {
    if (error) {
      console.error('오늘 예약 조회 오류: ' + error);
      res.status(500).send('서버 오류');
      return;
    }

    todayReservations = results;

    // 내일 예약 정보 조회
    db.query("SELECT * FROM reservations WHERE reservation_date = ?", [formattedTomorrow], (error, results, fields) => {
      if (error) {
        console.error('내일 예약 조회 오류: ' + error);
        res.status(500).send('서버 오류');
        return;
      }

      tomorrowReservations = results;

      // 시작 시간과 마지막 시간 설정
      const startTime = '17:00';
      const endTime = '18:30';

      // 시간대별로 그룹화
      const reservationsByTimeToday = {};
      const reservationsByTimeTomorrow = {};

      // 시작 시간부터 마지막 시간까지 30분 간격으로 루프
      let currentTime = startTime;
      while (currentTime <= endTime) {
        reservationsByTimeToday[currentTime] = [];
        reservationsByTimeTomorrow[currentTime] = [];

        todayReservations.forEach((reservation) => {
          if (reservation.prog_time === currentTime) {
            reservationsByTimeToday[currentTime].push(reservation);
          }
        });

        tomorrowReservations.forEach((reservation) => {
          if (reservation.prog_time === currentTime) {
            reservationsByTimeTomorrow[currentTime].push(reservation);
          }
        });

        // 다음 시간 계산
        const [hours, minutes] = currentTime.split(':').map(Number);
        if (minutes + 30 >= 60) {
          currentTime = `${hours + 1}:00`;
        } else {
          currentTime = `${hours}:${minutes + 30}`;
        }
      }

      res.render('main', { reservationsByTimeToday, reservationsByTimeTomorrow });
    });
  });
});

module.exports = router;
