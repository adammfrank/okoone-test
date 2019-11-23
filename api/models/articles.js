var mongoose = require('mongoose');
var articleSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

mongoose.model('Article', articleSchema);
