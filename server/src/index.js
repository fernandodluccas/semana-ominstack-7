const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cors = require("cors")
const routes = require("./routes")

const app = express()

const server = require("http").Server(app)
const io = require("socket.io")(server)

mongoose.connect(
  "mongodb+srv://admin:Pdz294UPQsrxuR1s@cluster0-m1yml.gcp.mongodb.net/week7?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
app.use((req, res, next) => {
  req.io = io
  next()
})
app.use(cors())

app.use(routes)
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
)

app.listen(3333)
