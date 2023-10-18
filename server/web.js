const express = require('express');
const path = require('path');
const app = express();
const PORT = 8001;

// EJS 템플릿 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../admin/views'));

// app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.static(path.join(__dirname, '../admin/static'))); //관리자 정적 파일

// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// })

//관리자 라우터
const clientListRoutes = require('./route/client_list'); 
const loginRoutes = require('./route/login'); 
const mainRoutes = require('./route/main'); 
const progManageRoutes = require('./route/prog_manage'); 
const reservManageRoutes = require('./route/reserv_manage'); 
app.use('/', clientListRoutes);
app.use('/', loginRoutes);
app.use('/', mainRoutes);
app.use('/', progManageRoutes);
app.use('/', reservManageRoutes);

app.listen(PORT, function () {
  console.log(`listening on ${PORT}`)
});
