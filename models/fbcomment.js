const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        content: {type: String, required:true, trim: true, min: 1, max: 500},
    }
)

module.exports = mongoose.model("FbComment", commentSchema);