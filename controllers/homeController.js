const Message = require('../models/message');

exports.index = function (req, res, next) {
  Message.find({})
    .populate('author')
    .exec((err, messages) => {
      if (err) {
        return next(err);
      }

      res.render('index', {
        title: 'Members only',
        content: 'home',
        props: { messages: messages.sort((a, b) => b.timestamp - a.timestamp) },
      });
    });
};
