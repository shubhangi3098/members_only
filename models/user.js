const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isMember: { type: Boolean, required: true, default: false },
  isAdmin: { type: Boolean, required: true, default: false },
});

UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = model('User', UserSchema);
