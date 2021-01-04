const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema(
    {
        version: Number,       // schema version
        name: {type: String, minlength:3, maxlength:30, required: true},
        oprojects: {type: [{type: Schema.Types.ObjectId, ref: 'Oproject'}]},
    }
)

module.exports = mongoose.model('Skill', skillSchema);