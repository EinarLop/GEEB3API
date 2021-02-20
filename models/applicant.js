// CROSS-REFERENCE BETWEEN USER AND A PROJECT
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicantSchema = new Schema(
    {
        userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
        oprojectid: { type: Schema.Types.ObjectId, ref: "Oproject", required: true},
        motive: {type: String, required:true},
        status: {type: String, enum: ["Pending", "Accepted", "Unaccepted"], default: "Pending"},
        created: {type: Date, default: Date.now()}
    }
)

module.exports = mongoose.model("Applicant", applicantSchema);