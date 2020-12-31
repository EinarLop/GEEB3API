var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var oprojectSchema = new Schema(
    {
        version: Number,       // schema version
        title: {type: String, required: true},
        description: {type: String, required: true},
        userid: {type: Schema.Types.ObjectId, ref: 'User', required:false},
        status: {type: String, required: true,
            enum: ['Open', 'Closed'],
            default: 'Open'},
        highlights: {type: [String], validate: [arrayLimit, 'Exceeds limit of 3']},
        tags: [String],
        skills: [String],
    }
)

// arrayLimit de 10 para Tag

function arrayLimit(arr) {
    return arr.length <= 3 ; 
}           // validation is better to be done in front-end?

oprojectSchema.virtual('url')
    .get(() => {
        return '/projects/oproject/' + this._id;
    });

module.exports = mongoose.model('Oproject', oprojectSchema);