var restify = require("restify");
module.exports = function(server,db) {
	server.get("/cards", function (req, res, next) {
		db.Cards.find().exec(function(error, cards){
			
			if (error) {
		  	 	return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
		  	}
		  	else {
		   		res.json(cards);
		  	}
		  	
			  res.send(200, cards)
  		});
		  
		return next();
	});

	server.post("/cards", function (req, res, next) {
	  // Create a new message model, fill it up and save it to Mongodb
	  var card = new db.Cards();
	  card.title = req.params.title;
	  card.text = req.params.text;
	  card.color = req.params.color;
	  card.save(function (error, data) {
		 if (error) {
		   return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
		  }
		  else {
		   res.json(data);
		  }
		  res.send(201, card)
		 })		
	});
	
	
	server.put('/cards/:id', function (req, res, next) {
		
		var cardData = {
	  		title: req.params.title,
	  		text: req.params.text,
	  		color: req.params.color
	 	};
		 
	 
	 	db.Cards.update({ _id: req.params.id }, cardData, {
		  multi: false
		}, function (error, user) {
		 console.log(error);

		  if (error) {
			  if(error.errors) {
				  return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
			  } else {
				  return next(new restify.InvalidArgumentError(JSON.stringify(error.message)))
			  }
			  
		  }
		  res.send()
		})
	})

	
	
	return {};
}