// 서버 포트설정

const express = require('express');

const fs = require('fs');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const mongoClient = require('./routes/mongo');

const app = express();
const PORT = process.env.PORT;
// ================================================================
// body-parser 코드
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie-parser 코드
app.use(cookieParser('soo'));

// session 코드
app.use(
  session({
    secret: 'soo',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// passport 코드
app.use(passport.initialize());
app.use(passport.session());

// ejs 코드
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
// ================================================================

const router = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const passportRouter = require('./routes/passport');

passportRouter();

app.use('/', router);
app.use('/register', registerRouter);
app.use('/login', loginRouter.router);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.end(err.message);
});

// ================================================================

// 서버 실행
app.listen(PORT, () => {
  console.log(`The express sever is running at ${PORT}`);
});
