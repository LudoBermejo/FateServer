var restify = require("restify");
module.exports = function(server,db) {
	server.get("/boards", function (req, res, next) {
		db.Boardss.find().exec(function(error, boards){
			
			if (error) {
		  	 	return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
		  	}
		  	else {
		   		res.json(boards);
		  	}
		  	
			  res.send(200, boards)
  		});
		  
		return next();
	});

	server.post("/boards", function (req, res, next) {
	  // Create a new message model, fill it up and save it to Mongodb
	  var board = new db.Boardss();
	  board.x = req.params.x;
	  board.y = req.params.y;
	  board.sizeX = req.params.sizeX;
	  board.sizeY = req.params.sizeY;
	  board.save(function (error, data) {
		 if (error) {
		   return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
		  }
		  else {
		   res.json(data);
		  }
		  res.send(201, board)
		 })		
	});

	server.put('/boards/:id', function (req, res, next) {
		
		var boardData = {
	  		x: req.params.x,
	  		y: req.params.y,
	  		sizeX: req.params.sizeX,
			sizeY: req.params.sizeY
	 	};
		 
	 
	 	db.Boardss.update({ _id: req.params.id }, boardData, {
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