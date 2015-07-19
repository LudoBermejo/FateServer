var restify = require("restify");
module.exports = function(server,db) {
	server.get("/positions", function (req, res, next) {
		db.Positions.find().exec(function(error, positions){
			
			if (error) {
		  	 	return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
		  	}
		  	else {
		   		res.json(positions);
		  	}
		  	
			  res.send(200, positions)
  		});
		  
		return next();
	});

	server.post("/positions", function (req, res, next) {
	  // Create a new message model, fill it up and save it to Mongodb
	  var position = new db.Positions();
	  position.x = req.params.x;
	  position.y = req.params.y;
	  position.sizeX = req.params.sizeX;
	  position.sizeY = req.params.sizeY;
	  position.save(function (error, data) {
		 if (error) {
		   return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
		  }
		  else {
		   res.json(data);
		  }
		  res.send(201, position)
		 })		
	});

	server.put('/positions/:id', function (req, res, next) {
		
		var positionData = {
	  		x: req.params.x,
	  		y: req.params.y,
	  		sizeX: req.params.sizeX,
			sizeY: req.params.sizeY
	 	};
		 
	 
	 	db.Positions.update({ _id: req.params.id }, positionData, {
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