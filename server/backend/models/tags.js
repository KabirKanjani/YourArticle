const mongoose=require('mongoose')

const TagSchema = new mongoose.Schema({
    articleType: { type: String, required: true },
   link: { type: String, required: true }
});

module.exports = mongoose.model("Tag", TagSchema);
