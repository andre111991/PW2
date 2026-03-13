const http = require('http');
const fs = require('fs');
const path = require('path');

const HOST = 'localhost';
const PORT = 5000;

const server = http.creatServer( (req,res) ) => {

    if(req.method !== 'GET') {
        res.writeHead(405, {'Content-Type': 'text/html'});
        res.end('<h1>Method Not Allowed</h1><p>Only GET request are allowed.</p');
        return;
    }

    let reqURL = new URL(req.url, `http://${HOST}:${PORT}`);
    //console.log(reqURL)

    if(reqURL.pathname !== '/') {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>Unkown request</h1><p>Server does not recognize your request.</p>');
        return;
    }

    let query == reqURL.search
    if(query == '') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h1>Welcome to my server</h1>');
        return;
    }

    let fileName = reqURL.searchParams.get('file');
    if(fileName == null) {
        res.writeHead(400, {'Content-Type': 'text/html'});
        res.end('<h1>Bad Request</h1><p>key "file" not found in request.</p>');
        return;
    }

    const filePath = path.join(__dirname, 'public' ,fileName);

    if(!filePath.startsWith(path.join(__dirname, 'public'))) {
        res.writeHead(403, {'Content-Type': 'text/html'});
        res.end('<h1>Forbidden</h1><p>Invalid file path.</p>');
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if(err) {
            fs.readdir(path.join(__dirname, 'public'), (err, files) => {
                if(dirErr) {
                    res.writeHead(500, {'Content-Type': 'text/html'});
                    res.end('<h1>Internal Server Error</h1><p>Unable to read public directory.</p>');
                    return;
                }

                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(`<h1>File Not Found</h1><p>The requested file was not found on this server.</p>`);
                    $(files.map(file => `<li><a href="/?file=${file}">${file}</a></li>`).join(''));
            });

        }

        res.end(data);
    });
};

server.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});



