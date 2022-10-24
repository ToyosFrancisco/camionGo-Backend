// modules
const { RateLimiter } = require('limiter');
const limiter = new RateLimiter(10, 'second', true);

module.exports = {
  // limit request per time period
  rateLimiter(req, res, next) {
    limiter.removeTokens(1, (err, remainingRequests) => {
      if (remainingRequests < 0) {
        res.writeHead(429, {'Content-Type': 'text/plain;charset=UTF-8'});
        return res.end('Too Many Requests - your IP is being rate limited');
      }

      return next();
    });
  }
};