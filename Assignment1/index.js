/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2018 Power Kernel
 */

/* import lib */
const http = require('http');
const url = require('url');

/**
 * create http server
 */
const server = http.createServer((req, res) => {
    // Parse the url and get the path
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

    // get the handler
    const handler = typeof(router[path]) !== 'undefined' ? router[path] : handlers.notFound;

    // run the handler
    handler((code, payload)=>{
        // get handler result or set it to empty
        payload = typeof(payload) === 'object'? payload : {};
        // set response to json format
        res.setHeader('Content-Type', 'application/json');
        // set the status code
        res.writeHead(code);
        // display the result
        res.end(JSON.stringify(payload));
    });

});

/**
 * make the server listens on port 3000
 */
server.listen(3000, () => {
    console.log('The server is up and running now');
});

/* define handlers */
const handlers = {};

// hello handler
handlers.hello = (cb)=>{
    cb(200,{'message':'Hello from Harry TANG!'});
};

// Not found handler
handlers.notFound = (cb)=>{
    cb(404,{'message':'Page not found!'});
};

// Define the request router
const router = {
    'hello' : handlers.hello
};