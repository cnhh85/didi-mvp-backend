const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

const url =
  "mongodb+srv://hype:hJ2zVlaAl8Ab9Oxk@hipe.k5mjx4n.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "didi-v1",
  })
  .then(() => {
    console.log("Connected to the Database.");
  })
  .catch((err) => console.error(err));

app.use(express.json());

const indexRouter = require("./routes/index");
const planRouter = require("./routes/plan");


// Without middleware
app.get("/user", function (req, res) {
  const newCheckPoint = CheckPoint();
  newCheckPoint.save();
  res.status(200).json("DONE");
});

app.use("/", indexRouter);
app.use("/plan", planRouter);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
