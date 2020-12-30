var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sprojectSchema = new Schema(
    {
        version: Number,       // schema version
        title: {type: String, required: true},
        description: {type: String, required: true},
        userid: {type: Schema.Types.ObjectId, ref: 'User', required:true},
        tags: {type: [{type: Schema.Types.ObjectId, ref: 'Tag'}]},
        links: [String],
        imageurls: [String]
    }
)

sprojectSchema.virtual('url')
    .get(() => {
        return '/catalog/sproject/' + this._id;
    });

module.exports = mongoose.model('Sproject', sprojectSchema);