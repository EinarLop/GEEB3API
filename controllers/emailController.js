const mongoose = require("mongoose");
const Applicant = require("../models/applicant");
const Oproject = require("../models/oproject");
const sgMail = require("@sendgrid/mail");
const ObjectID = require("mongoose").mongo.ObjectID;
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRIDKEY);

exports.test = async (req, res) => {
  console.log(req.body);
  let applicantsEmail = [];

  await Oproject.findById(mongoose.Types.ObjectId(req.body.oprojectid))
    .populate("userid")
    .then((oproject) => {
      // res.json(oproject);
      console.log("Creators email", oproject.userid.email);
      applicantsEmail.push(oproject.userid.email);
    })
    .catch((err) => res.status(500).json("Error" + err));

  await Applicant.find({
    oprojectid: mongoose.Types.ObjectId(req.body.oprojectid),
  })
    .populate("userid")
    .then((applications) => {
      // res.json(applications);
      // console.log(applications);
      for (app of applications) {
        applicantsEmail.push(app.userid.email);
      }
    })
    .catch((err) => res.status(500).json("Error" + err));

  // res.send("The email has been sent");
  console.log("pop", applicantsEmail);

  const msg = {
    to: applicantsEmail, // Change to your recipient
    from: "geebproject@gmail.com", // Change to your verified sender
    subject: req.body.subject,
    text: req.body.text,
    html: req.body.text,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

// To do: Email has been sent in frontend
// To do: Generate new key
