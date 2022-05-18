const secure = (req, res, next) => {
  const { token } = req.query;
  if (!token || token.length <= 3)
    return res.status(403).send("Forbidden. No token provided.");
  next();
};

module.exports = secure;
