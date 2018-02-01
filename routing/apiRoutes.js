var booksData= require("../data/books");
var path = require("path");

module.exports = function(app){
app.get("/api/books", function(req, res){
    res.sendFile(path.join(__dirname, "../data/books.js"))
});

app.post("/api/books", function(req, res) {
   //need the internal structure to this once I have more information about the survey data
var userInput = req.body;
var totalDifference =0;
var differentArray = [];
var chosenBook;
var chosenBookCover;
console.log('scores', userInput.scores);
for(var i=0; i<booksData.length; i++){
    for(var j=0; j<userInput.scores.length;j++){
        var scoreDiff = Math.abs(booksData[i].scores[j]-parseInt(userInput.scores[j]));
        totalDifference += scoreDiff;
    }
    var bookObject = {
        title:booksData[i].title,
        photo:booksData[i].photo,
        totalDifference:totalDifference};
        differentArray.push(bookObject);        
    }
    var lowest = Number.POSITIVE_INFINITY;
    for (var i=0; i<differentArray.length; i++) {
        tmp = differentArray[i].totalDifference;
        if (tmp < lowest){ 
            lowest = tmp;
            chosenBook = differentArray[i].title;
            chosenBookCover = differentArray[i].photo;

    }};
    var sendBack = {
        title:chosenBook,
        cover:chosenBookCover
    }
    res.json(sendBack);
});

};