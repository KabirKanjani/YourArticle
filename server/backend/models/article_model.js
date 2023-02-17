const mongoose=require('mongoose')

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    articleType: { type: String, required: true },        
    photo: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Article", ArticleSchema);
