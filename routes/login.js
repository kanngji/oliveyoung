// @ts-check

const express = require('express');

const router = express.Router();
const passport = require('passport');
const mongoClient = require('./mongo');

const isLogin = (req, res, next) => {
  if (req.session.login || req.user || req.signedCookies.user) {
    next();
  } else {
    res.statusCode = 300;
    res.send(
      'Login required. <br><a href="/login">로그인 페이지로 이동</a> <br> <a href="/">메인 페이지로 이동</a>'
    );
  }
};

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) {
      return res.send(
        `${info.message}<br><a href="/login">로그인 페이지로 이동</a>`
      );
    }
    req.logIn(user, (err) => {
      if (err) throw err;
      res.cookie('user', req.body.id, {
        expires: new Date(Date.now() + 1000 * 60),
        httpOnly: true,
        signed: true,
      });
      res.redirect('./posts');
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

router.get('/auth/naver', passport.authenticate('naver'));

router.get(
  '/auth/naver/callback',
  passport.authenticate('naver', {
    successRedirect: '/posts',
    failureRedirect: '/',
  })
);

//* 구글로 로그인하기 라우터 ***********************
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
); // 프로파일과 이메일 정보를 받는다.

//? 위에서 구글 서버 로그인이 되면, 네이버 redirect url 설정에 따라 이쪽 라우터로 오게 된다. 인증 코드를 박게됨
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }), //? 그리고 passport 로그인 전략에 의해 googleStrategy로 가서 구글계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = { router, isLogin };
