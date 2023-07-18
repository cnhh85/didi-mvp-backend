const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'None'],
    default: 'None',
  },
  email: { type: String, unique: true },
  password: String,
  avatar: String,
  bio: String,
  isPremium: { type: Boolean, default: false },
  plans: [{ type: mongoose.Schema.Types.ObjectId }],
});

var User = mongoose.model('User', userSchema);
module.exports = User;
