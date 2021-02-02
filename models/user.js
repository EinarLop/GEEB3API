const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {type: String, minlength:4, maxlength:20, trim:true, unique: true, required: true},
        email: {type: String, trim: true, lowercase:true, unique: true, required: true, 
                validate: [validEmail, "Not a valid email"]},
        password: {type: String, required: true},
        fullname: String,
        university: {type: String, 
            enum: ['ITESM CEM', 'ITESM CSF', 'ITESM CCM', 'UAM', 'ITAM', 'UNAM', 'Universidad Iberoamericana', 'Universidad Anáhuac', 'IPN', 'ITESM'],
            default: 'ITESM'},
        year: Number,
        bio: {type: String, maxlength:250},
        tags1: [String],
        tags2: [String],
        tags3: [String],
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

module.exports = mongoose.model("User", userSchema);