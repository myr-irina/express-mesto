/* eslint-disable no-undef */
// создадим express router
const router = require("express").Router();
// экспортируем его
module.exports = router;

// const cards = require("./cards.js");
const users = require("./users.js");

router.get("/users/:id", (req, res) => {
  if(!users[req.res.params]) {
    res.send({error: 'Такого пользователя не существует'})
  }
   res.send(users[req.params.id]);
});
