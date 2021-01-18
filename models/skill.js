const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema(
    {
        name: {type: String, minlength:1, maxlength:30, required: true},
        oprojects: {type: [{type: Schema.Types.ObjectId, ref: 'Oproject'}]},
    }
)

module.exports = mongoose.model('Skill', skillSchema);