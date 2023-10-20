const express = require('express');
const router = express.Router();
const db = require('../../db');
const bodyParser = require('body-parser')
const cors = require('cors');
router.use(cors());
router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.post('/phonenumchange', (req, res) => {
  const newPhone = req.body.newPhoneNum;
  const originalPhone = req.body.originalPhoneNum;
  console.log("originalPhone",originalPhone)
  console.log("newPhoneNum:",newPhoneNum)

  db.query(
    "UPDATE client SET phone = ? WHERE phone = ?",
    [newPhone, originalPhone],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ success: false, message: '서버 오류' });
      } else if (results.length > 0) {
        // 사용자 인증 성공
        const user = results[0];
        // 성공적으로 인증되면 세션을 생성하거나 JWT 토큰을 생성하여 반환
        // const token = generateToken(user);
        res.json({ success: true });
      } else {
        // 인증 실패
        res.status(401).json({ success: false, message: '인증 실패' });
      }
    }
  );
});

module.exports = router;