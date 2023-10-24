const express = require('express');
const path = require('path');
const app = express();
const PORT = 8001;

// Client Start
const login = require('./client/login');
const main = require('./client/main');
const reservation = require('./client/reservation');
const signup = require('./client/signup');
const count = require('./client/mytree');
const phoneNumChange = require('./client/mypage/phoneNumChange');
const passwordChange = require('./client/mypage/passwordChange');

// react를 빌드한 결과물이 담긴 디렉토리 /build 에 접근하여 미들웨어를 생성해준다.
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

app.use('/',login);
app.use('/',main);
app.use('/',reservation);
app.use('/',signup);
app.use('/',count);
app.use('/',phoneNumChange);
app.use('/',passwordChange);

// Client End

//관리자 start
// EJS 템플릿 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../admin/views'));

app.use(express.static(path.join(__dirname, '../admin/static'))); //관리자 정적 파일

const clientListRoutes = require('./admin/client_list'); 
const loginRoutes = require('./admin/login'); 
const mainRoutes = require('./admin/main'); 
const progManageRoutes = require('./admin/prog_manage'); 
const reservManageRoutes = require('./admin/reserv_manage'); 
const saleManageRoutes = require('./admin/sale_manage'); 
app.use('/', clientListRoutes);
app.use('/', loginRoutes);
app.use('/', mainRoutes);
app.use('/', progManageRoutes);
app.use('/', reservManageRoutes);
app.use('/', saleManageRoutes);
//관리자 end

app.listen(PORT, function () {
  console.log(`listening on ${PORT}`)
});
