const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {

    //apenas métodos get
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/html' });
        res.end('<h1>Method Not Allowed</h1><p>Server only accepts GET requests</p>');
        return;
    }
    
    // parsing url
    let reqURL = new URL(req.url, `http://${HOST}:${PORT}`);
    // console.log(reqURL)

    if (reqURL.pathname !== '/') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("<h1>Unknown Request</h1><p>Server does not recognize your request</p>");
        return;
    }

    //verificar se o pedido tem ou não query string
    let query = reqURL.search
    if (query == '') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to my server!</h1>');
        return;
    }

    //parse da query string para obter o valor do parâmetro 'file'
    let fileName = reqURL.searchParams.get('file');
    if (fileName == null) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('<h1>Bad Request</h1><p>Missing "file" query parameter</p>');
        return;
    }

    //construir o caminho do arquivo a partir do nome do arquivo
    let filePath = path.join(__dirname, "public", fileName);
    
    if (!filePath.startsWith(path.join(__dirname, "public"))) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end('<h1>Forbidden</h1><p>Invalid file path</p>');
        return;
    };

    //ler o ficheiro pedido
    fs.readFile(filePath, (err, data) => {
        if(err) {
           // read dir
              fs.readdir(path.join(__dirname, "public"), (err, files) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('<h1>Internal Server Error</h1><p>Could not read directory</p>');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<h1>Available Files:</h1><ul>');
                files.forEach(file => {
                    // incluir link para cada ficheiro
                    res.write(`<li><a href="/?file=${file}">${file}</a></li>`);
                });
                res.end('</ul>');
                });
            return;
        }
        
        //caso contrario, enviar o conteúdo do ficheiro como resposta
        res.end(data);
        })
 
});



server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});