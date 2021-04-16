const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
    titulo: {
        type: String,
        require: true,
    },
    texto: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

mongoose.model("posts", Post);
