const crypto = require('crypto');
const Rijndael = require('rijndael-js');

const DELIMITER = '~~~';
const CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyz';

const generateRandomString = length => [...Array(length)]
  .map(() => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)])
  .join('');

const getKeyForCipher = key => key.length > 32 ? key.substr(0, 32) : key.padEnd(32, 'X');

const createCryptian = (key) => {
  const iv = generateRandomString(16);
  const cipher = new Rijndael(getKeyForCipher(key), 'ecb');

  return {
    cipher: { transform: (data) => Buffer.from(cipher.encrypt(data, 128, iv)) },
    decipher: { transform: (data) => Buffer.from(cipher.decrypt(data, 128, iv)) },
  };
};

const urlensafe = data => Buffer
  .from(data)
  .toString('base64')
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '');

const hashHmacSha256 = (key, value) => {
  const hmac = crypto.createHmac('sha256', key);
  hmac.write(value);
  hmac.end();
  return urlensafe(hmac.read());
};

const encrypt = (key, value) => {
  const { cipher } = createCryptian(key);
  const blockSize = cipher.getBlockSize();
  const padding = blockSize - (value.length % blockSize);

  const cipherValue = value.padEnd(value.length + padding, String.fromCharCode(padding));
  const cipherText = cipher.transform(cipherValue);

  const safe = urlensafe(cipherText);
  return `${safe}${DELIMITER}${hashHmacSha256(key, safe)}`;
};

const decrypt = (key, data) => {
  const { decipher } = createCryptian(key);
  const [safe] = data.split(DELIMITER);

  const cipherData = Buffer.from(
    safe
      .replace(/\-/g, '+')
      .replace(/\_/g, '/'),
    'base64'
  );

  const cipherText = decipher.transform(cipherData).toString();
  const endCharVal = cipherText[cipherText.length - 1].charCodeAt(0);

  if ((endCharVal <= 16) && (endCharVal >= 0)) {
    return cipherText.substr(0, cipherText.length - endCharVal);
  }

  return cipherText;
};

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
module.exports.genRandomString = generateRandomString;
