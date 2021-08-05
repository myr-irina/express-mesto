/* eslint-disable indent */
/* eslint-disable no-console */
const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(() => res
    .status(500)
    .send({ message: 'Ошибка сервера.' }));

const createCard = (req, res) => {
    const { name, link } = req.body;
    const owner = req.user._id;

    return Card.create({ name, link, owner })
      .then((card) => res.status(200).send(card))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
        } else {
          res.status(500).send({ message: 'Ошибка сервера.' });
        }
      });
  };

  const deleteCard = (req, res) => {
    const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(new Error('Error'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
       if (err.name === 'CastError') {
        res.status(400).send({ message: 'Ошибка в запросе.' });
      } else if (err.message === 'Error') {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера.' });
      }
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    // eslint-disable-next-line no-underscore-dangle
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
  .orFail(new Error('Error'))
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.' });
    } else if (err.message === 'Error') {
      res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
    } else {
      res.status(500).send({ message: 'Ошибка сервера.' });
    }
  });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    // eslint-disable-next-line no-underscore-dangle
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
  .orFail(new Error('Error'))
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка.' });
    } else if (err.message === 'Error') {
      res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
    } else {
      res.status(500).send({ message: 'Ошибка сервера.' });
    }
  });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
