var restify = require("restify");
module.exports = function(server,db) {
	server.get("/boards", function (req, res, next) {
		db.Boards.find({}).select('name description').exec(function(error, boards){
			
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
	  
	  var board = new db.Boards();

	  for(var i in req.params) {
		  board[i] = req.params[i];
	  }
	  
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
		
		var boardData = req.params;
	 	db.Boards.update({ _id: req.params.id }, boardData, {
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