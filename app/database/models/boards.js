module.exports = function(mongoose) {
  
  var BoardsSchema = new mongoose.Schema({
    name: {
      type: String,
      required:true
    },
    description: {
      type: String,
    },
    notes: [],
    created: {
      type: Date,
      default: Date.now
    },
    backgroundColor: String,
    backgroundImage: String,
    createdBy: String
     
  });
  
  var Boards = mongoose.model('Boards', BoardsSchema);
  
  
  return Boards;
}

