const database = require("./db");
const socket = require("./socket");

module.exports = {
    ...database,
    ...socket,
}