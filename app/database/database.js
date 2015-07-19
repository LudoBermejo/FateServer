module.exports = function(config) {
  var mongoose = require("mongoose");
  var db = mongoose.connection;
  
  db.on('error', console.error.bind(console,
    'connection error:'));
  
  db.once('open', function () {
    console.info('connected to database');
   
    
  });
  
  mongoose.connect(config.db.path);

  var Cards = require("./models/cards")(mongoose);
  var Positions = require("./models/positions")(mongoose);
  
  var db = {
    Cards: Cards,
    Position: Positions
  }
  
  
  return db;
}
