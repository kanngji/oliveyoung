// @ts-check

const express = require('express');

const router = express.Router();
const mongoClient = require('./mongo');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
  const client = await mongoClient.connect();
  const userCursor = client.db('board').collection('users');
  const duplicated = await userCursor.findOne({ id: req.body.id });
  if (duplicated === null) {
    const result = await userCursor.insertOne({
      id: req.body.id,
      name: req.body.name,
      pw: req.body.pw,
    });
    if (result.acknowledged) {
      res.statusCode = 202;
      res.send(
        'Successfully registered. <br><a href="/login">로그인 페이지로 이동</a>'
      );
    } else {
      res.statusCode = 500;
      res.send(
        'Register failed. <br><a href="/register">회원가입 페이지로 이동</a>'
      );
    }
  } else {
    res.statusCode = 300;
    res.send(
      'Already enterd ID. <br><a href="/register">회원가입 페이지로 이동</a>'
    );
  }
});

module.exports = router;
