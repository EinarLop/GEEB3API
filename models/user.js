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
    //validate: [validEmail, "Not a valid email"],
  },
  password: { type: String, required: true },
  fullname: String,
  university: {
    type: String,
    enum: [
      "ITESM CEM",
      "ITESM CSF",
      "ITESM CCM",
      "UAM",
      "ITAM",
      "UNAM",
      "Universidad Iberoamericana",
      "Universidad Anáhuac",
      "IPN",
      "ITESM",
    ],
    default: "ITESM",
  },
  semester: Number,
  major: String,
  bio: { type: String, maxlength: 400 },
  links: [String],
  mastered: [String],
  learning: [String],
  want: [String],
});

function validEmail(email) {
  let re = "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/";
  return re.test(email);
}
// alternativelt use 'match' option for validation [regex, message]

userSchema.virtual("url").get(() => {
  return "/people/user/" + this._id;
});

module.exports = mongoose.model("User", userSchema);
