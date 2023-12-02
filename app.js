require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const nocache = require('nocache');
const methodOverride = require('method-override');
const multer = require( 'multer' )

const connetDB = require('./src/config/db')
const passport = require('./src/config/passport-config')

const { isActiveRoute } = require('./src/helpers/routeHelper')

const indexRouter = require('./src/routes/index');
const authRouter = require('./src/routes/authRoute');
const adminRouter = require('./src/routes/adminRoute');
const usersRouter = require('./src/routes/userRoute');
// const adminRouter = require('./routes/admin');

const app = express();





app.use(expressLayouts);
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', './layouts/userLayout')

app.use(logger('tiny'));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    maxAge: 1000* 60 * 60 * 24
  }
}))


app.use(nocache());

// passport session
app.use(passport.initialize())
app.use(passport.session())


app.locals.isActiveRoute = isActiveRoute

app.use(flash());

connetDB();


app.use('/', indexRouter);
app.use('/', authRouter);
// app.use('/', shopRouter);
app.use('/user', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
