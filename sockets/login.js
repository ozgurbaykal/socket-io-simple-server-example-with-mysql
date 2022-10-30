const MD5 = require("crypto-js/md5")
const {sql} = require("../helpers/sql")

module.exports = (socket) =>{
    socket.on("login", async ({username, password}) =>{
        if(typeof username !== "undefined" || typeof password !== "undefined"){
            try{
                console.log("loginOn username: ", username, " undefined: ",password)

                const [loginSql] = await sql.execute(`SELECT * FROM ${"testnode"}.users WHERE user_name =? && user_passw =?`, [username.toString(), MD5(password).toString()])
                if(loginSql.length > 0){
                    socket.emit("loginResponse", {status: true, no: 3, message: `${username} hesabına giriş yapıldı.`, username: username, schema: loginSql[0].user_schema_name})
                } else{
                    socket.emit("loginResponse", {status: false, no: 2, message: "Bu bilgilerde bir kullanıcı bulunamadı."})
                }
            } catch (e) {
                console.log(e)
                socket.emit("loginResponse", {status: false, no: 1, message: "API üzerinde bir sorun oluştu."})
            }
        } else{
            socket.emit("loginResponse", {status: false, no: 0, message: "API'e eksik bilgi gönderildi."})
        }
    })
}
