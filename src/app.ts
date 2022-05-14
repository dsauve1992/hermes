import express from 'express'
import 'dotenv/config'
import createError from 'http-errors'
import path from 'path'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import csrf from 'csurf'
import passport from 'passport'
import logger from 'morgan'
import connectSqlite3 from 'connect-sqlite3'

import authRouter from './modules/user/auth/router/authRouter'
import companyRouter from './modules/company/router/companyRouter'
import * as MySQLConnector from './modules/shared/infrastructure/database/mysql/MySQLConnector'

const app = express()
const port = process.env.EXPRESS_PORT || 3000

const SQLiteStore = connectSqlite3(session)
MySQLConnector.init()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.locals.pluralize = require('pluralize')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' }),
  })
)
app.use(csrf())
app.use(passport.authenticate('session'))
app.use(function (req, res, next) {
  const msgs = req.session.messages || []
  res.locals.messages = msgs
  res.locals.hasMessages = !!msgs.length
  req.session.messages = []
  next()
})
app.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken()
  next()
})

app.use('/', authRouter)
app.use('/company', companyRouter)

app.get('/', (req, res) => {
  req.user ? res.render('index', { user: req.user }) : res.render('home')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`))
