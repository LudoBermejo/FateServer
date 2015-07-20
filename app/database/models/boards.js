module.exports = function(mongoose) {
  
  var BoardsSchema = new mongoose.Schema({
    name: {
      type: String,
      required:true
    },
    description: {
      type: String,
    }
  });
  
  var Boards = mongoose.model('Boards', BoardsSchema);
  
  
  return Boards;
}

