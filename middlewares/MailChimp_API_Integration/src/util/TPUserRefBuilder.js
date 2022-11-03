const TPSecurityUtils = require('./TPSecurityUtils');

const DATA_KEYS = {
  firstName: 'first_name',
  lastName: 'last_name',
  uid: 'uid',
  email: 'email',
  createDate: 'create_date',
  timestamp: 'timestamp'
};

class TPUserRefBuilder {
  constructor(uid, email) {
    this.data = {};

    this.set(DATA_KEYS.uid, uid);
    this.set(DATA_KEYS.email, email);
  }

  set(key, value) {
    this.data[key] = value;
  }

  setFirstName(firstName) {
    this.set(DATA_KEYS.firstName, firstName);
    return this;
  }

  setLastName(lastName) {
    this.set(DATA_KEYS.lastName, lastName);
    return this;
  }

  setCreateDate(createDate) {
    this.set(DATA_KEYS.createDate, createDate);
    return this;
  }

  build(privateKey) {
    this.set(DATA_KEYS.timestamp, Math.floor(Date.now() / 1000));
    return TPSecurityUtils.encrypt(privateKey, JSON.stringify(this.data));
  }
}

module.exports = TPUserRefBuilder;
module.exports.create = (...args) => new TPUserRefBuilder(...args);
