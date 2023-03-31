const { body, validationResult } = require('express-validator');

const Message = require('../models/message');

exports.create_message_get = function (req, res, next) {
  res.render('index', {
    title: 'Create Message',
    content: 'message/create',
    props: { message: undefined, errors: undefined },
  });
};

exports.create_message_post = [
  body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('content', 'Content must not be empty.').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    if (!req.user) {
      res.redirect('/message/create');
    }
    const errors = validationResult(req);

    const message = new Message({
      author: req.user.id,
      title: req.body.title,
      content: req.body.content,
      timestamp: Date.now(),
    });

    if (!errors.isEmpty()) {
      res.render('index', {
        title: 'Create Message',
        content: 'message/create',
        props: { message: undefined, errors: errors.errors },
      });
    } else {
      message.save((err) => {
        if (err) {
          return next(err);
        }

        res.redirect('/');
      });
    }
  },
];

exports.delete_message_get = function (req, res, next) {
  if (req.user && req.user.isAdmin) {
    Message.findByIdAndDelete(req.params.id).exec((err) => {
      if (err) {
        return next(err);
      }

      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
};
