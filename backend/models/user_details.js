const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: true },
    allArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
});

module.exports = mongoose.model("User", UserSchema);

