const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: { type: String, minlength: 1, maxlength: 30, required: true },
  oprojects: { type: [{ type: Schema.Types.ObjectId, ref: 'Oproject' }] },
  sprojects: { type: [{ type: Schema.Types.ObjectId, ref: 'Sproject' }] }
});

module.exports = mongoose.model("Tag", tagSchema);
