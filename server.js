const http = require("http");
const fs = require("fs");
const path = require('path');
const mime = require('mime-types');

http.createServer((request, response) => {
    let url = request.url.replace(/(\?.*)|(\/\.\.)/, ""),
        cwd = process.cwd(),
        body = "OK",
        path = cwd + (url === '/' ? '/index.html' : url);

    fs.lstat(path, (error, status) => {
        if(!error && status){
            if (status.isFile()) {
                const fileContentType = mime.lookup(path);
                response.writeHead(200, { 'Content-Type': fileContentType });
                body = fs.readFileSync(path);
                response.write(body);
            } else {
                response.writeHead(200,{'Content-Type' : 'text/plain; charset=utf-8'})
                response.write(body);
            }
        } else{
            response.writeHead(404, { 'Content-Type': "text/plain" });
            response.write(`${request.url} not found`);
        }      
        response.end();
    });



}).listen(8080)