const express = require("express");
const app = express();

const port = 8000;

app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'))

app.get('/', (req, res) => {
    res.render('desk_main');
  })

app.listen(port, () => {
    console.log("server open", port);
})