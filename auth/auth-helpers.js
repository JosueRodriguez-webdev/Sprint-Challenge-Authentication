const db = require("../database/dbConfig.js");

module.exports = {
  add,
  findByUsername
};

function add(body) {
  return db("users").insert(body);
}

function findByUsername(username) {
  return db("users")
    .where({ username })
    .first();
}
