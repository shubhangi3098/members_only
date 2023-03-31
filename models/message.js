const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

module.exports = model('Message', MessageSchema);
