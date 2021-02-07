const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sprojectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userid: { type: Schema.Types.ObjectId, ref: "User", required: false }, // required: true
  collaborators: [String],
  tags: {type: [String], validate: [tagLimit, "Exceeds tag limit"]},
  links: [String],
  imageurls: {type: [String], default: ["gs://geebimages.appspot.com/geek.jpg"]},
});

function tagLimit(arr) {
  return arr.length <= 6;
}

sprojectSchema.virtual("url").get(() => {
  return "/catalog/sproject/" + this._id;
});

module.exports = mongoose.model("Sproject", sprojectSchema);
