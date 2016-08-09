var express = require("express")
var logger = require("morgan")

var app = express()

app.use(logger("dev"))
app.use(express.static(__dirname + "/public"))
app.set("port", 8000)

module.exports = app