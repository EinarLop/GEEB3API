const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const oprojectSchema = new Schema({
  title: { type: String, required: true, minlength: 5, maxlength:50},
  description: { type: String, required: true, minlength:5, maxlength:300 },
  userid: { type: Schema.Types.ObjectId, ref: "User", required: false },
  status: {
    type: String,
    required: true,
    enum: ["Open", "Closed"],
    default: "Open",
  },
  highlights: { type: [String], validate: [arrayLimit, "Exceeds limit"] },
  tags: { type: [String], validate: [tagLimit, "Exceeds limit"] },    // string names of tags
  skills: { type: [String], validate: [tagLimit, "Exceeds limit"] },  // string names of skill tags  
  desirables: { type: [String], validate: [arrayLimit, "Exceeds limit"] },
  created: {type: Date, default: Date.now()}
});

function arrayLimit(arr) {
  return arr.length <= 5;
}

function tagLimit(arr) {
  return arr.length <= 6;
}

oprojectSchema.virtual("url").get(() => {
  return "/projects/oproject/" + this._id;
});

module.exports = mongoose.model("Oproject", oprojectSchema);
