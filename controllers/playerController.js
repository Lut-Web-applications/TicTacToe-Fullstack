const Player = require("../models/player");

exports.index = async function (req, res, next) {

  try {
    const players = await Player.find({});
    res.render("players", {
      title: "Players are",
      player_list: players,
    });
  } catch(err) {
    return next(err);
  }
};

exports.create = async function (req, res, next) {
  const player = new Player({
    name: req.body.name,
    won: 0,
  });

  try {
    await player.save();
  } catch (err) {
    return next(err);
  }

  res.redirect("/players");
};
