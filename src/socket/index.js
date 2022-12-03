const {Server} = require("socket.io");
const constant = require("../constant");

function socket(server) {
    const io = new Server(server, {
        cors: {
            origin: constant.ORIGIN,
            methods: ["GET", "POST"],
        }
    });

    io.use(function (socket, next) {
        next();
    })

    io.on("connection", function (socket) {
        console.log("connection socket", socket.id);
        socket.on(constant.FOLLOW_ACCOUNT, function (data) {
            console.log("join_group", data);
            socket.join(socket.id);
        })
        socket.on(constant.NOTIFY_FOLLOWING_ACCOUNT, function (data) {
            console.log("notify_group", data);
            io.to(data).emit('receive_group', `Notify from group ${data}`);
        })
    });

    return io;
}

module.exports = socket;