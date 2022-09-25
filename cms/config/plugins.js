const secrets = require("../lib/secrets");

module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: secrets.JWT_SECRET,
      jwt: {
        expiresIn: "7d",
      },
    },
  },
});
