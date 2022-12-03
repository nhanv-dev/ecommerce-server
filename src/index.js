const express = require("express");
const http = require("http");
const database = require("./config/database");
const cors = require("cors");
const route = require("./routes");
const dotenv = require("dotenv");
const app = express();
const server = http.createServer(app);
const socket = require("./socket")(server);

const PORT = process.env.Port || 8080;
dotenv.config();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


// app.use(function (req, res, next) {
//     res.io = socket;
//     next();
// });

database.connect().then(() => {
    route(app);
});

server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))


