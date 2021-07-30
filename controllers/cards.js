/* eslint-disable no-undef */
const Card = require("../models/card");

const getCards = (req, res) =>
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() =>
      res
        .status(500)
        .send({ message: `Запрашиваемый ресурс не найден.` })
    );

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch(() =>
      res
        .status(500)
        .send({ message: `Ошибка при создании карточки.` })
    );
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  return Card.findByIdAndRemove(cardId)
    .then((card) => res.status(200).send(card))
    .catch(() =>
      res
        .status(500)
        .send({ message: `Ошибка при удалении карточки.` })
    );
};

const likeCard = (req, res) => {
  const { cardId } = req.params;

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(200).send(card))
    .catch(() =>
      res
        .status(500)
        .send({
          message: `На сервере произошла ошибка при лайке карточки.`,
        })
    );
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(200).send(card))
    .catch(() =>
      res
        .status(500)
        .send({
          message: `На сервере произошла ошибка при дизлайке карточки.`,
        })
    );
};


module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
