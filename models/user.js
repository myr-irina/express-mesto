// eslint-disable-next-line no-undef
const mongoose = require("mongoose");

// Опишем схему пользователя:
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return v >= 1
      },
      message: "Вы не заполнили это поле",
    },
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return v >= 1
      },
      message: "Вы не заполнили это поле",
    },
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return v >= 1
      },
      message: "Вы не заполнили это поле",
    },
  },
});

// eslint-disable-next-line no-undef
module.exports = mongoose.model('user', userSchema);