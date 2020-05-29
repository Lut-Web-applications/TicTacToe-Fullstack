const Game = require("../models/game");
const Field = require("../models/field");

exports.update = async function (req, res, next) {
  /** Update field, game, memo(front end) */
  try {
    let field = await Field.findOne({ cellId: req.body.cellId });
    let game = await Game.findOne({ player1: "Player 1" });

    field.content = req.body.content;
    game.count += 1;

    await field.save();
    await game.save();
    res.send({});
  } catch (err) {
    return next(err);
  }
};

exports.reset = async function (req, res, next) {
  /** Reset memo on front end */

  /** Reset game and field */
  const game = new Game({
    player1: "Player 1",
    player2: "Player 2",
    count: 0,
  });

  try {
    await Game.deleteMany();
    await game.save();
    await Field.deleteMany();
  } catch (err) {
    return next(err);
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const field = new Field({
        cellId: "cell" + i + j,
        content: "",
      });
      try {
        await field.save();
      } catch (err) {
        return next(err);
      }
    }
  }

  res.redirect("/");
};

exports.restore = async function (req, res, next) {
  /** Restore game, field, memo(front end) */
  try {
    const allFieds = await Field.find({}).sort("cellId");

    res.render("index", { title: "Tic Tac Toe", fields: allFieds });
  } catch (err) {
    return next(err);
  }
};

exports.restoreFrontend = async function (req, res, next) {
  try {
    const game = await Game.findOne({ player1: "Player 1" });
    const count = game.count;

    const allFields = await Field.find({}).sort("cellId");

    const memo = [];
    let k = 0;
    for (let i = 0; i < 5; i++) {
      const col = [];
      for (let j = 0; j < 5; j++) {
        col.push(allFields[k].content);
        k++;
      }
      memo.push(col);
    }

    const data = JSON.stringify({
      memo: memo,
      count: count,
    });

    res.send(data);
  } catch (err) {
    return next(err);
  }
};
