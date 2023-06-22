const userService = require("../service/userService");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cnhhiep85@gmail.com",
    pass: "aspolhrasmfioihm",
  },
});

let mailOptions = {
  from: "cnhhiep85@gmail.com",
  to: "",
  subject: "Successfully upgrade to premium!",
  text: "Please click on the link to activate premium: ",
};

module.exports = {
  createUser: (req, res, next) => {
    userService
      .createUser(req.body)
      .then((result) => {
        console.log(result);
        res.status(200).json("Created: " + result._id);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
  getUser: (req, res, next) => {
    userService
      .getUser(req.params.userId)
      .then((result) => {
        result.password = undefined;
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
  editUser: (req, res, next) => {
    const { password, ...data } = req.body;
    userService
      .editUser(req.params.userId, data)
      .then((result) => {
        res.status(200).json("Edited: " + result._id);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
  authUser: (req, res, next) => {
    userService
      .authUser(req.body.email, req.body.password)
      .then((result) => {
        result.password = undefined;
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
  changePlanList: (req, res, next) => {
    userService
      .editUser(req.params.userId, { plans: req.body })
      .then((result) => {
        res.status(200).json("Edited: " + result._id);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
  upgradeToPremium: (req, res, next) => {
    userService
      .editUser(req.params.userId, { isPremium: true })
      .then((result) => {
        res.render("index");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
  requestUpgrade: (req, res, next) => {
    userService
      .getUser(req.params.userId)
      .then((result) => {
        mailOptions.to = result.email;
        mailOptions.text =
          "Please click on the link to activate premium: localhost:3000/user/" +
          req.params.userId +
          "/upgradeToPremium";
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            res.status(500).json("Error: " + error);
          } else {
            console.log("Email sent: " + info.response);
            res.status(200).json("Email sent: " + info.response);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
};
