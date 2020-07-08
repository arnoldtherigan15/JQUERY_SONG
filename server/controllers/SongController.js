const { Song } = require("../models");

class SongController {
  static create(req, res, next) {
    let { title, artist, genre, url } = req.body;
    let userId = req.userData.id
    Song.create({
      title,
      artist,
      genre,
      url,
      userId
    })
      .then((data) => {
        res.status(201).json({ song: data });
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    let userId = req.userData.id
    Song.findAll({
      where: {
        userId
      }
    })
      .then((data) => {
        res.status(200).json({ songs: data });
      })
      .catch(next);
  }

  static findOne(req, res, next) {
    let { id } = req.params;
    Song.findByPk(id)
      .then((data) => {
        if (!data) res.status(400).json({ error: "id not found" });
        else res.status(200).json({ song: data });
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let { id } = req.params;
    Song.findByPk(id)
      .then((data) => {
        if (!data) throw { status: 400, msg: 'Song not found' }
        else {
          return Song.destroy({
            where: {
              id,
            },
          });
        }
      })
      .then((data) => {
        res.status(200).json({ msg: "success delete song" });
      })
      .catch(next)
  }

  static update(req, res, next) {
    let { id } = req.params
    Song.findByPk(id)
    .then(data => {
      if (!data) {
        throw { status: 400, msg: 'Song not found' }
      }

      return data.update({
        ...data, //spread out existing song
        ...req.body //spread out req.body - the differences in the body will override the song returned from DB.
      })
    })
    .then((updatedSong) => {
      res.status(200).json(updatedSong)
    })
    .catch(next)
}
}

module.exports = SongController;
