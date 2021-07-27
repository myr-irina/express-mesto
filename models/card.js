// eslint-disable-next-line no-undef
const mongoose = require("mongoose");

// Опишем схему карточки:
const cardSchema = new mongoose.Schema({
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
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return v >= 1
      },
      message: "Вы не заполнили это поле",
    },
  },
  owner: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return v >= 1
      },
      message: "Вы не заполнили это поле",
    },
  },
  likes: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return v >= 1
      },
      message: "Вы не заполнили это поле",
    },
  },
  createdAt : {
    type: Date,
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
module.exports = mongoose.model('card', cardSchema);