/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(() => res.status(500).send({ message: 'Ошибка сервера.' }));

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Ошибка при запросе.' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера.' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера.' });
      }
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  console.log(req.body);

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new Error('Error'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else if (err.message === 'Error') {
        res.status(404).send({ message: 'Пользователя нет в базе' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера.' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })

    .orFail(new Error('Error'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'Error') {
        res.status(404).send({ message: 'Пользователя нет в базе' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера.' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
