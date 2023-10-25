const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

router.use(cors());
router.use(helmet());
router.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// GET 요청: 로그인 페이지 표시
router.get('/admin/login', (req, res) => {
    res.render('login');
});

// POST 요청: 로그인 데이터 처리
router.post('/admin/login', (req, res) => {
    const ID = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM admin WHERE id = ? AND passwd = ?" ,
        [ID, password],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: '서버 오류' });
            } else if (results.length > 0) {
                const user = results[0];

                bcrypt.compare(password, user.passwd, (err, result) => {
                    if (result) {
                        // 비밀번호 일치
                        req.session.loggedIn = true;
                        res.redirect('/admin/dashboard');
                    } else {
                        // 비밀번호 불일치
                        res.render('login', { error: '비밀번호가 일치하지 않습니다' });
                    }
                });
            } else {
                // 사용자 없음
                res.render('login', { error: '사용자를 찾을 수 없습니다' });
            }
        }
    );
});

// GET 요청: 대시보드(메인..?) 페이지 표시 (로그인 필요)
router.get('/admin/dashboard', (req, res) => {
    if (req.session.loggedIn) {
        // 로그인 상태 확인
        res.render('dashborad');
    } else {
        // 로그인되지 않은 경우 로그인 페이지로 리디렉션
        res.redirect('/admin');
    }
});

module.exports = router;
