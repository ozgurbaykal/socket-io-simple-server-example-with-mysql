const fs = require("node:fs")

const sockets = fs.readdirSync(`${process.cwd()}/sockets`).filter(f => f.endsWith(".js"))


module.exports = {
    getSockets (io, socket){
        sockets.forEach(socketName =>{
            try{
                require(`${process.cwd()}/sockets/${socketName}`)(socket, io)
            } catch (e) {
                console.log(e)
                console.log(`${socketName} is don't loaded.`)
            }
        })
    }
}
