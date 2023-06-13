const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json())

var indexRouter = require('./routes/index');
 
// Without middleware
app.get('/user', function (req, res) {
    res.status(200).send("User Page");
})

app.use('/', indexRouter);

 
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});