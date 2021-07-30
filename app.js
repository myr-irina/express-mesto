/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards')
// eslint-disable-next-line no-unused-vars
const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use((req, res, next) => {
  req.user = {
    _id: '6102ca6d5d45382ab85bbaf2'
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});


