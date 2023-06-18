const express = require("express");
const http = require("http");
const database = require("./src/config/database");
const cors = require("cors");
const route = require("./src/routes");
const dotenv = require("dotenv");
const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;
dotenv.config();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors({origin: '*'}));

app.use(function (req, res, next) {
    const allowedOrigins = ['https://ecommerce-d49f8.web.app', 'http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

database.connect();
// app.get("/", (req, res) => {
//     res.send("Express is running!!")
// });
route(app);
server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))

module.exports = app;
