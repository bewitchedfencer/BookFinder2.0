// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT||3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//creating static directory for my front end html
app.use(express.static(path.join(__dirname,"/public")));

//requiring the routes
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);


//server starts listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });