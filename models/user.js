var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        version: Number,       // schema version
        username: {type: String, minlength:4, maxlength:20, trim:true, unique: true, required: true},
        email: {type: String, trim: true, lowercase:true, unique: true, required: true},
            //match: ['/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/', 'Not a valid email']},
        password: {type: String, required: true},
        tags1: [String],
        tags2: [String],
        tags3: [String],
        fullname: String,
        university: {type: String, 
            enum: ['ITESM CEM', 'ITESM CSF', 'ITESM CCM', 'UAM', 'ITAM', 'UNAM', 'Universidad Iberoamericana', 'Universidad Anáhuac', 'IPN', 'ITESM'],
            default: 'ITESM'},
        year: Number,
        bio: String,
    }
) 

function validEmail(email) {
    let re = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/';
    return re.test(email);
}
// alternativelt use 'match' option for validation [regex, message]

userSchema.virtual('url')
    .get(() => {
        return '/people/user/' + this._id;
    });

module.exports = mongoose.model('User', userSchema);