const express = require("express");
const app = express();

const port = 8000;

app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'))

app.get('/', (req, res) => {
    res.render('main');
  })

app.get('/reservation_manage', (req, res) => {
    res.render('reservation_manage');
  })

app.get('/client_list', (req, res) => {
    res.render('client_list');
  })

app.get('/prog_manage', (req, res) => {
    res.render('prog_manage');
  })

app.listen(port, () => {
    console.log("server open", port);
})