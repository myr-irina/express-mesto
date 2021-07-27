/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const express = require("express");
const mongoose = require("mongoose");

// eslint-disable-next-line no-unused-vars
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();


// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});


