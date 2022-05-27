import express from 'express'
import 'dotenv/config'
import 'reflect-metadata'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import csrf from 'csurf'
import passport from 'passport'
import logger from 'morgan'

import authRouter from './modules/user/auth/router/authRouter'
import companyRouter from './modules/company/router/companyRouter'
import AppDataSource from './modules/shared/infrastructure/database/mysql/data-source'
import errorHandlerMiddleware from './modules/shared/infrastructure/middleware/errorHandler.middleware'
import { notFoundHandler } from './modules/shared/infrastructure/middleware/notFoundHandler.middleware'
import { sessionHandler } from './modules/shared/infrastructure/middleware/sessionHandler.middleware'
import { localMessagesHandler } from './modules/shared/infrastructure/middleware/localMessages.middleware'
import { csrfTokenHandler } from './modules/shared/infrastructure/middleware/csrfTokenHandler.middleware'

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

const app = express()

app.locals.pluralize = require('pluralize')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sessionHandler)
app.use(csrf())
app.use(passport.authenticate('session'))
app.use(localMessagesHandler)
app.use(csrfTokenHandler)

app.use('/', authRouter)
app.use('/companies', companyRouter)

app.get('/', (req, res) => {
  req.user ? res.render('index', { user: req.user }) : res.render('home')
})

app.use(notFoundHandler)
app.use(errorHandlerMiddleware)

const port = process.env.EXPRESS_PORT || 3000
app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`))

export default app
