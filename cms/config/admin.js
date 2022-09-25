const secrets = require("../lib/secrets");

module.exports = ({ env }) => ({
  apiToken: {
    salt: secrets.API_TOKEN_SALT,
  },
  auth: {
    secret: secrets.ADMIN_JWT_SECRET,
  },
});
