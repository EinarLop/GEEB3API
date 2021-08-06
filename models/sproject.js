const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sprojectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userid: { type: Schema.Types.ObjectId, ref: "User", required: false }, // required: true
  collaborators: [String],
  tags: { type: [String], validate: [tagLimit, "Exceeds tag limit"] },
  links: [String],
  imageurls: { type: [String], default: ["https://firebasestorage.googleapis.com/v0/b/geebimages.appspot.com/o/geek.jpg?alt=media&token=105a4c0e-3a72-4d93-a61b-7bd07e9eb390"] },
  created: { type: Date, default: Date.now() },
});

function tagLimit(arr) {
  return arr.length <= 6;
}

sprojectSchema.virtual("url").get(() => {
  return "/catalog/sproject/" + this._id;
});

module.exports = mongoose.model("Sproject", sprojectSchema);
