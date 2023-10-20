const express = require('express');
const router = express.Router();

// GET 요청: 로그인 페이지 표시
router.get('/admin/login', (req, res) => {
    res.render('login');
});

// POST 요청: 로그인 데이터 처리
router.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    // 여기에서 사용자의 인증을 수행
    if (username === '사용자명' && password === '비밀번호') {
        // 인증 성공
        // 세션을 설정하고 로그인한 후의 페이지로 리디렉션
        req.session.loggedIn = true;
        res.redirect('/admin/dashboard'); // 로그인 후 페이지로 리디렉션
    } else {
        // 인증 실패
        res.render('login', { error: '로그인 실패함' });
    }
});

module.exports = router;