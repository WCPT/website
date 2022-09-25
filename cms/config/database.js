const path = require("path");
const secrets = require("../lib/secrets");

module.exports = ({ env }) => {
  let connection;

  switch (env("DB_CLIENT", "sqlite")) {
    case "mysql": {
      connection = {
        client: "mysql",
        connection: {
          host: env("MYSQL_HOST", "mysql"),
          port: env("MYSQL_PORT", 3306),
          database: env("MYSQL_DATABASE"),
          user: secrets.MYSQL_USER,
          password: secrets.MYSQL_PASSWORD,
          pool: {
            min: 0,
            max: 10,
            acquireTimeoutMillis: 5000,
            idleTimeoutMillis: 5000,
            reapIntervalMillis: 5000,
          },
        },
      };
      break;
    }

    case "sqlite": {
      connection = {
        client: "sqlite",
        connection: {
          filename: path.join(
            __dirname,
            "..",
            env("DATABASE_FILENAME", ".tmp/data.db")
          ),
        },
        useNullAsDefault: true,
      };
      break;
    }

    default:
      throw new Error(
        "`DB_CLIENT` environment variable must be defined as `sqlite` or `mysql`"
      );
  }

  return {
    connection,
  };
};
