const secrets = require("../lib/secrets");

module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("PUBLIC_URL", "http://localhost"),
  proxy: env.bool("PROXY", false),
  app: {
    keys: (secrets.APP_KEYS || "").split(","),
  },
});
