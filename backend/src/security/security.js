const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");

module.exports = (app) => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
  });
  app.use(cors("*"));
  app.use(limiter);
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy());
  app.use(helmet.referrerPolicy({ policy: "same-origin" }));
  app.use(helmet.frameguard({ action: "deny" }));
  app.use(helmet.hsts());
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());
  app.use((req, res, next) => {
    res.setHeader("Expect-CT", "max-age=86400");
    next();
  });
  app.use(function (req, res, next) {
    res.setHeader("X-Frame-Options", "deny");
    next();
  });
  app.use(function (req, res, next) {
    res.setHeader("Referrer-Policy", "same-origin");
    next();
  });
  app.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    next();
  });
  return app;
};
