module.exports = function(mongoose) {
  
  var CardsSchema = new mongoose.Schema({
    title: {
      type: String,
      required:true
    },
    color: {
      type: String,
      required:true
    },
    text: {
      type: String,
      required:true
    }
  });
  
  var Cards = mongoose.model('Cards', CardsSchema);

  
  return Cards;
}
