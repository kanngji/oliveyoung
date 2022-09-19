// @ts-check

const express = require('express');

const router = express.Router();
const mongoClient = require('./mongo');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const client = await mongoClient.connect();
  const userCursor = client.db('board').collection('users');
  const duplicatedId = await userCursor.findOne({ id: req.body.id });
  if (duplicatedId !== null) {
    if (duplicatedId.pw === req.body.pw) {
      req.session.login = true;
      req.session.userId = req.body.id;
      res.redirect('/posts');
    } else {
      res.statusCode = 300;
      res.send(
        'Incorreted Password. <br><a href="/login">로그인 페이지로 이동</a>'
      );
    }
  } else {
    res.statusCode = 300;
    res.send('Not signed ID. <br><a href="/login">로그인 페이지로 이동</a>');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});
module.exports = router;
