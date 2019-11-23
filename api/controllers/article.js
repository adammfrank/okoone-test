var mongoose = require('mongoose');
var Article = mongoose.model('Article');

var sendJSONresponse = function (res, status, content) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.status(status);
    res.json(content);
};

module.exports.store = function (req, res) {

    const article = new Article();

    article.title = req.body.title;
    article.description = req.body.description;
    article.date = req.body.date;

    article.save(function (err) {
        if (err) {
            return res.status(400).send(article);
        }

        res.status(200).json(article);
    });
};
