var mongoose = require('mongoose');
var Article = mongoose.model('Article');


module.exports.store = async function (req, res) {

    const article = new Article();

    article.title = req.body.title;
    article.description = req.body.description;
    article.date = req.body.date;
    article.user_id = req.payload._id;

    try {
        await article.save()
        return res.status(200).json(article);
    }
    catch (err) {
        return res.status(400).json(err);
    }

};

module.exports.list = async function (req, res) {

    const sort = req.query.sort === 'desc' ? -1 : 1;

    const query = {
        'user_id': mongoose.Types.ObjectId(req.payload._id)
    };
    if (req.query.searchText) {
        query['title'] = { '$regex': req.query.searchText, '$options': 'i' };
    }
    if (req.query.date) {
        query['date'] = { '$lt': req.query.date };
    }

    try {
        const articles = await Article.find(query)
            .sort({ 'title': sort }).exec();
        res.status(200).json(articles);
    }
    catch (err) {
        return res.status(400).json(err);
    }

};

module.exports.listPublic = async function (req, res) {

    const sort = req.query.sort === 'desc' ? -1 : 1;

    const query = {
    };
    if (req.query.searchText) {
        query['title'] = { '$regex': req.query.searchText, '$options': 'i' };
    }
    if (req.query.date) {
        query['date'] = { '$lt': req.query.date };
    }

    try {
        const articles = await Article.find(query)
            .sort({ 'title': sort }).exec();
        res.status(200).json(articles);
    }
    catch (err) {
        return res.status(400).json(err);
    }

};

module.exports.get = async function (req, res) {
    const _id = req.params._id;
    try {
        const article = await Article.find({ '_id': _id });
        return res.status(200).json(article);
    }
    catch (err) {
        return res.status(400).json(err);
    }
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
