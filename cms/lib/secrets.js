const path = require("path");
const { getSecrets } = require("docker-secret");

const defaultDir = path.join(__dirname, "..", "secrets");
const secretsDir = process.env.SECRETS_DIR || defaultDir;

const secrets = getSecrets(secretsDir);

module.exports = secrets;
