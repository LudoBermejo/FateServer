module.exports = function(config,db) {
    var restify = require('restify');  
    var server = restify.createServer({
          certificate: null,     // If you want to create an HTTPS server, pass in the PEM-encoded certificate and key
          key: null,             // If you want to create an HTTPS server, pass in the PEM-encoded certificate and key
          formatters: null,      //  Custom response formatters for res.send()
          log: null,             // You can optionally pass in a bunyan instance; not required
          name: 'fateboard-api',      // By default, this will be set in the Server response header, default is restify
          spdy: null,            // Any options accepted by node-spdy
          version: '1.0.0',      // A default version to set for all routes
          handleUpgrades: false  // Hook the upgrade event from the node HTTP server, pushing Connection: Upgrade requests through the regular request handling chain; defaults to false
    });

    server.use(restify.acceptParser(server.acceptable));  // Parses out the Accept header, and ensures that the server can respond to what the client asked for. You almost always want to just pass in server.acceptable here, as that's an array of content types the server knows how to respond to (with the formatters you've registered). If the request is for a non-handled type, this plugin will return an error of 406.
    server.use(restify.authorizationParser());  // Parses out the Authorization header as best restify can. Currently only HTTP Basic Auth and HTTP Signature schemes are supported. When this is used, req.authorization will be set to something like:
    server.use(restify.CORS());                 // Supports tacking CORS headers into actual requests (as defined by the spec). Note that preflight requests are automatically handled by the router, and you can override the default behavior on a per-URL basis with server.opts(:url, ...).
    server.use(restify.dateParser());           // Parses out the HTTP Date header (if present) and checks for clock skew (default allowed clock skew is 300s, like Kerberos). You can pass in a number, which is interpreted in seconds, to allow for clock skew.
    server.use(restify.bodyParser());
    server.use(restify.queryParser());          // Parses the HTTP query string (i.e., /foo?id=bar&name=mark). If you 
    
    server.listen(config.api.port, function () {
        console.log("Server started @ " + config.api.port);
    });
    
    restify.defaultResponseHeaders = function(data) {
      this.header("Access-Control-Allow-Origin", "*");
  	  this.header("Access-Control-Allow-Headers", "X-Requested-With");
    };

    var cardModel = require("./models/CardModel")(server,db);
    var positionModel = require("./models/PositionModel")(server,db);
    
    var module = {};
    module.export = server;
    
    return module;    
}

