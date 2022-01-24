require("dotenv").config()
const fs = require("fs")
const path = require("path")
const express = require("express")
const cors = require("cors")
const EWS = require("express-ws")
const { successify, errorify } = require("./utils")
const { viewsRouter, baseRouter } = require("./router")



const app = express()
const ews = EWS(app)
app.use(cors())
app.use("/api", baseRouter)

app.ws("/bridge", (ws, req) => {
  let ip = req._socket.remoteAddress
  ws.on("message", async (message) => {
    let data = JSON.parse(message)
    let { fname , content } = data
    let fpath = path.join(__dirname, "uploads", fname)
    try{
      await fs.promises.writeFile(fpath, content)
      ws.send(JSON.stringify({ success: true, error: false, message: "wrote to file"}))
    }
    catch(e){
      ws.send(JSON.stringify({ success: false, error: e }))
    }
  })
})

app.get("/", (req, res) => res.end("ok"))

app.get("/ping", (req, res) => {
  successify(res, { message: "ping" })
})

app.listen(process.env.PORT, () => console.log(`server running at port ${process.env.PORT}`))


