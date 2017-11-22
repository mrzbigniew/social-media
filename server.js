const http = require("http");
const fs = require("fs");

http.createServer(function (request, response) {
    console.log(request.url);



    if (request.url === '/') {
        let file = fs.readFile('./posts.html', function (error,data) {
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
            response.write(data);
            response.end();
        });
    }
    else{
        response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8;" });
        response.write("OK");
        response.end();
    }    
}).listen(8080)