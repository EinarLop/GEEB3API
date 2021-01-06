const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sprojectSchema = new Schema({
  version: Number, // schema version
  title: { type: String, required: true },
  description: { type: String, required: true },
  userid: { type: Schema.Types.ObjectId, ref: "User", required: false }, // required: true
  // tags: {type: [{type: Schema.Types.ObjectId, ref: 'Tag'}]},
  tags: [String],
  links: [String],
  imageurls: [String],
});

// arrayLimit de 10 para Tag

sprojectSchema.virtual("url").get(() => {
  return "/catalog/sproject/" + this._id;
});

module.exports = mongoose.model("Sproject", sprojectSchema);
