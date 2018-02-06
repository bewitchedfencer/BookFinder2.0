var booksData= require("../data/books");
var path = require("path");

module.exports = function(app){
app.get("/api/books", function(req, res){
    res.sendFile(path.join(__dirname, "../data/books.js"))
});

app.post("/api/books", function(req, res) {
   //need the internal structure to this once I have more information about the survey data
var userInput = req.body;
userScores = userInput['scores[]'];
console.log(userInput);
var totalDifference =0;
var chosenBook={
    chosenTitle:"",
    chosenBookCover:"",
    chosenDifference:Infinity
};
console.log('scores', userInput.scores);
for(var i=0; i<booksData.length; i++){
    currentBook = booksData[i];
    for(var j=0; j<userInput.scores.length;j++){
        currentUserScore=userInput.scores[j];
        currentBookScores=currentBook.scores[j];
        totalDifference += Math.abs(parseInt(currentBookScores)-parseInt(currentUserScore));
        console.log(totalDifference);
    }
    if(totalDifference<=chosenBook.chosenDifference){
        chosenBook.chosenTitle=currentBook.title;
        chosenBook.chosenBookCover=currentBook.photo;
        chosenBook.chosenDifference= totalDifference;
    }
}
    res.json(chosenBook);
});

};