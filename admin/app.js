const express = require("express");
const app = express();

const port = 8000;

app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'))

// 라우트 모듈 가져오기
const clientListRoutes = require('./route/client_list');
const loginRoutes = require('./route/login');
const mainRoutes = require('./route/main');
const progManageRoutes = require('./route/prog_manage');
const reservManageRoutes = require('./route/reserv_manage');

// 라우트 등록
app.use('/', clientListRoutes);
app.use('/', loginRoutes);
app.use('/', mainRoutes);
app.use('/', progManageRoutes);
app.use('/', reservManageRoutes);

app.listen(port, () => {
    console.log("server open", port);
})