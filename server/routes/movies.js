var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM movies', function (err, result) {
      done();

      console.log(result.rows);

      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var movie = req.body;
  console.log(movie);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO movies (title, year, genre, director) ' +
                  'VALUES ($1, $2, $3, $4)',
                   [movie.title, movie.year, movie.genre, movie.director],
                 function (err, result) {
                   done();

                   if (err) {
                     res.sendStatus(500);
                     return;
                   }

                   res.sendStatus(201);
                 });
  });
});

module.exports = router;
