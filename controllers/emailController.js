const mongoose = require("mongoose");
const Applicant = require("../models/applicant");
const Oproject = require("../models/oproject");
const sgMail = require("@sendgrid/mail");
const ObjectID = require("mongoose").mongo.ObjectID;
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRIDKEY);

getApplicants = async (oprojectid) => {
  let applicantsEmail = [];

  await Applicant.find({
    oprojectid: mongoose.Types.ObjectId(oprojectid),
  })
    .populate("userid")
    .then((applications) => {
      for (app of applications) {
        applicantsEmail.push(app.userid.email);
      }
    })
    .catch((err) => res.status(500).json("Error" + err));

  return applicantsEmail;
};

getCreator = async (oprojectid) => {
  let creatorEmail;
  await Oproject.findById(mongoose.Types.ObjectId(oprojectid))
    .populate("userid")
    .then((oproject) => {
      //console.log("Creators email", oproject.userid.email);
      creatorEmail = oproject.userid.email;
    })
    .catch((err) => res.status(500).json("Error" + err));

  return creatorEmail;
};

exports.send = async (req, res) => {
  let recipients;
  let creator;
  recipients = await getApplicants(req.body.oprojectid);
  creator = await getCreator(req.body.oprojectid);
  recipients.push(creator);

  const msg = {
    to: recipients, // Change to your recipient
    from: "geebproject@gmail.com", // Change to your verified sender
    subject: req.body.subject,
    text: `This Email was sent by the creator of the project -> ${creator}. ${req.body.text}`,
    html: `This Email was sent by the creator of the project -> ${creator}. ${req.body.text}`,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.send(recipients);
    })
    .catch((error) => {
      res.status(500).json("Error" + error);
    });
};

exports.getApplicantsInfo = async (req, res) => {
  let applicantsEmail = [];

  await Applicant.find({
    oprojectid: mongoose.Types.ObjectId(req.body.oprojectid),
  })
    .populate("userid")
    .then((applications) => {
      for (app of applications) {
        applicantsEmail.push(app.userid);
      }
    })
    .catch((err) => res.status(500).json("Error" + err));
  res.send(applicantsEmail);
};

// To do: Email has been sent in frontend
// To do: Generate new key
