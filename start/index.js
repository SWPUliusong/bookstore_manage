var app = require("../app")
var http = require("http")

var port = process.env.PORT || app.get("port")

var server = http.createServer(app)

server.listen(port)

server.on("listening", function() {
    console.log('server is running at ' + port)
})