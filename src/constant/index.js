const database = require("./db");
const socket = require("./socket");
const userRoles = require("./userRoles");

module.exports = {
    ...database,
    ...socket,
    ...userRoles
}