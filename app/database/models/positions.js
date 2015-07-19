module.exports = function(mongoose) {
  
  var PositionsSchema = new mongoose.Schema({
    x: {
      type: Number,
      required:true
    },
    y: {
      type: Number,
      required:true
    },
    sizeX: {
      type: Number,
      required:true
    },
    sizeY: {
      type: Number,
      required:true
    }
  });
  
  var Positions = mongoose.model('Positions', PositionsSchema);
  
  
  return Positions;
}

