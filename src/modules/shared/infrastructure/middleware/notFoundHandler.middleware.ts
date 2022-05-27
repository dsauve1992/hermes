import createError from 'http-errors'

export const notFoundHandler = function (req, res, next) {
  next(createError(404))
}
