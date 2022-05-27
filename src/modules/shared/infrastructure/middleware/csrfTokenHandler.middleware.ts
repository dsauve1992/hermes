export const csrfTokenHandler = function (req, res, next) {
  res.locals.csrfToken = req.csrfToken()
  next()
}
