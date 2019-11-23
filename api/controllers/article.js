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
            return res.status(400).json(err);
        }

        res.status(200).json(article);
    });
};

module.exports.list = function (req, res) {

    const sort = req.query.sort === 'desc' ? -1 : 1;

    const query = {};
    if (req.query.searchText) {
        query['title'] = { '$regex': req.query.searchText, '$options': 'i' };
    }
    if (req.query.date) {
        query['date'] = { '$lt': req.query.date };
    }

    Article.find(query)
        .sort({ 'title': sort }).exec(function (err, articles) {
            if (err) {
                return res.status(400).json(err);
            }

            res.status(200).json(articles);

        });
};

module.exports.get = function (req, res) {
    const _id = req.params._id;
    Article.find({ '_id': _id }, function (err, article) {
        if (err) {
            return res.status(400).json(err);
        }

        res.status(200).json(article);
    });
}

module.exports.update = async function (req, res) {
    const _id = req.params._id;
    const article = await Article.findOne({ '_id': req.params._id });

    article.title = req.body.title;
    article.description = req.body.description;
    article.date = req.body.date;

    try {
        await article.save();
        return res.status(200).json(article);
    }
    catch (err) {
        return res.status(400).json(err);
    }
}

module.exports.delete = async function (req, res) {
    try {
        await Article.findByIdAndRemove(req.params._id);
        return res.status(200).send();
    }
    catch (err) {
        return res.status(400).send(err);
    }
}
