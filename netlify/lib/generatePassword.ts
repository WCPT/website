import crypto from "crypto";

type Options = {
  length?: number;
  numbers?: boolean;
  symbols?: boolean;
  exclude?: string;
  uppercase?: boolean;
  lowercase?: boolean;
  excludeSimilarCharacters?: boolean;
};

// Generate a random password.
export function generatePassword(options: Options = {}) {
  // Set defaults.
  const op = {
    length: options.length ?? 10,
    numbers: options.numbers ?? false,
    symbols: options.symbols ?? false,
    exclude: options.exclude ?? "",
    uppercase: options.uppercase ?? true,
    lowercase: options.lowercase ?? true,
    excludeSimilarCharacters: options.excludeSimilarCharacters ?? false,
  };

  const minStrictLength =
    1 + (op.numbers ? 1 : 0) + (op.symbols ? 1 : 0) + (op.uppercase ? 1 : 0);
  if (minStrictLength > op.length) {
    throw new TypeError("Length must correlate with strict guidelines");
  }

  // Generate character pool
  let pool = "";

  if (op.lowercase) {
    pool += lowercase;
  }
  if (op.uppercase) {
    pool += uppercase;
  }
  if (op.numbers) {
    pool += numbers;
  }
  if (op.symbols) {
    if (typeof op.symbols === "string") {
      pool += op.symbols;
    } else {
      pool += symbols;
    }
  }
  if (!pool) {
    throw new TypeError("At least one rule for pools must be true");
  }
  if (op.excludeSimilarCharacters) {
    pool = pool.replace(similarCharacters, "");
  }
  // excludes characters from the pool
  let i = op.exclude.length;
  while (i--) {
    pool = pool.replace(op.exclude[i], "");
  }

  return _generatePassword(op, pool);
}

export default generatePassword;

// ------------------------------

const RANDOM_BATCH_SIZE = 256;
let randomIndex = 0;
let randomBytes: Buffer;

// This function is used to get the next random byte from the randomBytes array.
// If we have already used all the random bytes in the array, we generate a new
// array of random bytes.
function getNextRandomValue() {
  // Initialise random bytes array if not initialised
  if (!randomBytes || randomIndex >= randomBytes.length) {
    randomBytes = crypto.randomBytes(RANDOM_BATCH_SIZE);
  }
  return randomBytes[randomIndex++];
}

// Generates a random number
function randomNumber(max: number) {
  // gives a number between 0 (inclusive) and max (exclusive)
  let rand = getNextRandomValue();
  while (rand >= 256 - (256 % max)) {
    rand = getNextRandomValue();
  }
  return rand % max;
}

// Possible combinations
const lowercase = "abcdefghijklmnopqrstuvwxyz",
  uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers = "0123456789",
  symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~',
  similarCharacters = /[ilLI|`oO0]/g,
  strictRules = [
    { name: "lowercase", rule: /[a-z]/ },
    { name: "uppercase", rule: /[A-Z]/ },
    { name: "numbers", rule: /[0-9]/ },
    { name: "symbols", rule: /[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]/ },
  ] as const;

function _generatePassword(options: Required<Options>, pool: string): any {
  const optionsLength = options.length;
  const poolLength = pool.length;
  let password = "";

  for (let i = 0; i < optionsLength; i++) {
    password += pool[randomNumber(poolLength)];
  }

  // Iterate over each rule, checking to see if the password works.
  let fitsRules = strictRules.every(function (rule) {
    // If the option is not checked, ignore it.
    if (options[rule.name] == false) return true;

    // Treat symbol differently if explicit string is provided
    if (rule.name === "symbols" && typeof options[rule.name] === "string") {
      // Create a regular expression from the provided symbols
      let re = new RegExp("[" + options[rule.name] + "]");
      return re.test(password);
    }

    // Run the regex on the password and return whether
    // or not it matches.
    return rule.rule.test(password);
  });

  // If it doesn't fit the rules, generate a new one (recursion).
  if (!fitsRules) {
    return _generatePassword(options, pool);
  }

  return password;
}
