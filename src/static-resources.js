const staticResourceMiddleware = (req, res, next) => {
  const isAsset = /\.(css|js|png|jpg|jpeg|gif|svg|woff2?|ttf|eot|ico)$/i.test(req.url);
  if (isAsset) {
    const delay = Math.floor(Math.random() * (400 - 150 + 1)) + 150; // 150–400ms
    setTimeout(() => next(), delay);
  } else {
    next();
  }
}

module.exports = {
  staticResourceMiddleware,
};