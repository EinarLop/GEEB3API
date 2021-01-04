const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema(
    {
        version: Number,       // schema version
        name: {type: String, minlength:3, maxlength:30, required:true},
        oprojects: {type: [{type: Schema.Types.ObjectId, ref: 'Oproject'}]},
        sprojects: {type: [{type: Schema.Types.ObjectId, ref: 'Sproject'}]}
    }
)

module.exports = mongoose.model('Tag', tagSchema);