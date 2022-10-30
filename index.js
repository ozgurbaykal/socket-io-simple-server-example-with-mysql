const express = require("express")
const app = express()
const server = require("node:http").createServer(app)
const io = require("socket.io")(server)
const PORT = 3000
const {getSockets} = require("./helpers/autoLoader")

io.on("connection", (socket) =>{
    console.log(`${socket.id} connected`)
    getSockets(io, socket)
    socket.on("disconnect", () =>{
        console.log(`${socket.id} disconnected`)
    })
})

server.listen(PORT, () => {
    console.log("sunucu çalıştı")
})

