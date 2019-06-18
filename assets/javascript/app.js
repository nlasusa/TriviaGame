$(document).ready(function () {

	//my variable options listing an array of objects which contain Q's, choices, answers & a photo
    var options = [
    {
		question: "What was the original name of the show?", 
		choice: ["Central Perk", "Those Times in New York", "Insomnia Cafe ", "Six of One"],
		answer: 3,
		photo: "assets/images/sixofone.jpg"
	 },
	 {
	 	question: "What is the name of Joey's stuffed penguin?", 
		choice: ["Buddy", "Hugsy", "Walter", "Denny"],
		answer: 1,
        photo: "assets/images/hugsy.jpg"    
     },
     {
       question: "Which one of Joey's sisters did Chandler fool around with at Joey's birthday party?", 
       choice: ["Mary Angela", "Mary Anne", "Mary Therese", "Mary Marie"],
       answer: 0,
       photo: "assets/images/MaryAngela.png"    
     },
     {
        question: "What is the name of Ross and Rachel's daughter?", 
        choice: ["Jane", "Ella", "Emma", "Julie"],
        answer: 2,
        photo: "assets/images/babyemma.jpg"    
     },
     {
        question: "Which friend lived on the street when they were younger?", 
        choice: ["Ross", "Chandler", "Phoebe", "Gunther"],
        answer: 2,
        photo: "assets/images/homelessphoebe.jpg"    
     },
     { 
        question: "Which band do Ross, Chandler and Monica go to see for Ross' birthday ?", 
        choice: ["Pearl Jam", "Hootie and the Blowfish", "Barenaked Ladies", "Sugar Ray"],
        answer: 1,
        photo: "assets/images/hootie.jpg"  
}];

// other variables 
var correctCount = 0;
var wrongCount = 0;
var unansweredCount = 0;
var timer = 6;
var intervalId;
var userGuess ="";
var running = false;
var questionCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];

$("#reset").hide();
// click start button to start the game 
$("#start").on("click", function () {
    $("#start").hide();
    displayQuestion();
    runTimer();
    for(var i = 0; i < options.length; i++) {
holder.push(options[i]);
}
})

//start the timer 
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}

//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
    timer --;
    
//if timer is out and reaches 0 
if (timer === 0) {
    unansweredCount++;
    stop();
    $("#answerblock").html("<p>Time up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
    hidepicture();
}
}

//timer stop and clear 
function stop() {
	running = false;
	clearInterval(intervalId);
}

//pick a question from our array 
function displayQuestion() {
	//random index in array, can change each time user plays again
	index = Math.floor(Math.random()*options.length);
    pick = options[index];
    
    //	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayQuestion();
//	} else {
//		console.log(pick.question);
		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}

// /click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 6;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unansweredCount) === questionCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unansweredCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unansweredCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}
$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})
})

