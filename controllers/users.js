/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const User = require("../models/user");
//возвращаем всех юзеров
const getUsers = (req, res) =>
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() =>
      res
        .status(500)
        .send({ message: `Запрашиваемый ресурс не найден.` })
    );

//возвращаем пользователя по _id
const getUserById = (req, res) =>
  User.findById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch(() =>
      res
        .status(500)
        .send({
          message: `Запрашиваемый пользователь не найден.`,
        })
    );

//создаем пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body; //получим из объекта запроса имя, описание и аватар пользователя

  return (
    User.create({ name, about, avatar }) //создадим документ на основе пришедших данных
      .then((user) => res.status(200).send(user)) //вернем записанные в базу данные
      //если данные не записались, вернем ошибку
      .catch(() =>
        res
          .status(500)
          .send({ message: `Ошибка при создании пользователя.` })
      )
  );
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name: name, about: about },
    { new: true }
  )
    .then((user) => res.status(200).send(user))
    .catch(() =>
      res
        .status(500)
        .send({
          message: `Ошибка при обновлении профиля пользователя.`,
        })
    );
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar: avatar }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch(() =>
      res
        .status(500)
        .send({
          message: `Ошибка при обновлении аватара пользователя.`,
        })
    );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
