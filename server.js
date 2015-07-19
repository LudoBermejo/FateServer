var config = require("./config/config.js");
var database = require("./app/database/database")(config);
var restify = require("./app/api/restify")(config,database);