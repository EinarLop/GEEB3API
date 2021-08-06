const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 4,
    maxlength: 20,
    trim: true,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validEmail, "Not a valid email"],
  },
  fullname: { type: String, maxlength: 40, default: "" },
  college: {
    type: String,
    enum: [
      "ITESM",
      "UNAM",
      "IPN",
      "ITAM",
      "IBERO",
      "ANÁHUAC",
      "UAM",
      "UDLAP",
      "LA SALLE",
    ],
    default: "ITESM",
  },
  semester: Number,
  major: String,
  bio: { type: String, maxlength: 400, default: "Hello! I am new to GEEB." },
  links: [String],
  mastered: { type: [String], validate: [arrLimit, "Exceeds size limit"] },
  learning: { type: [String], validate: [arrLimit, "Exceeds size limit"] },
  want: { type: [String], validate: [arrLimit, "Exceeds size limit"] },
});

function validEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function arrLimit(arr) {
  return arr.length <= 8;   // arbitrary num; decide later
}
// alternativelt use 'match' option for validation [regex, message]

userSchema.virtual("url").get(() => {
  return "/people/user/" + this._id;
});

module.exports = mongoose.model("User", userSchema);
