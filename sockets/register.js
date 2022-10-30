const MD5 = require("crypto-js/md5")
const {sql} = require("../helpers/sql")

module.exports = (socket) =>{
    socket.on("register", async ({userName = "", userPassw = ""}) =>{
        if(userName !== "" && userPassw !== 0){
            try{
                await sql.execute(`INSERT INTO ${"testnode"}.users SET user_name =?, user_passw =?`, [userName, MD5(userPassw).toString()])
                socket.emit("register_response", {status: true, no: 2, message: "Veriler başarıyla eklendi!"})
            } catch (e) {
                console.log(e)
                socket.emit("register_response", {status: false, no: 1, message: "API üzerinde bir sorun oluştu."})
            }
        } else{
            socket.emit("register_response", {status: false, no: 0, message: "Eksik bilgi gönderildi."})
        }
    })
}
