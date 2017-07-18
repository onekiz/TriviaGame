//////////HM-5 TRIVIA GAME //////////////
/////CHAMPIONS LEAGUE 2017 QUIZ/////////
////////////////////////////////////////



//////LOADING PAGE CALLING STARTING THE GAME///////
$(document).ready(function() {
  quiz.load();
  $("#btnStart").click(quiz.start);
  $("#btnDone").click(quiz.done);

});

/////GLOBAL VARIABLES//////
var time;                          //setTimeOut object
var count = 30;                    //duration of quiz seconds
var selectedQuestions = ["1"];     //random selected questions from ranQuestions pool
var selectedChoices = ["1"];       //Choices of random selected questions
var selectedAnswers = [1];         //Answers of random selected questions
var classInput = "ques";           //Class name for radio inputs for each question

///////CREATING OBJECT WITH ITS METHODS AND VARIABLES/////////////////////////
var quiz = {                // QUIZ OBJECT

    ranQuestions: ['What is the highest scoring match so far\?','Who scored the first goal of the campaign\?',"What was the score in both group games between Real Madrid - Dortmund\?"
    ,"Which of these teams did not finish top of their group\?","Who is the compatitions top scorer\?","Which goalkeeper saved two penalties in the round of 16\?"
    ,"Which team exited in the group stage despite conceding only 2 goals\?","What stadium did host the final\?","Which teams played the final\?","Who won the CL Final\?"],

    ranAnswers: [
      ["Man. City vs Monaco","Barcelona vs PSG","Dortmund vs Legia","Napoli vs Benfica","Porto vs Roma"],
      ["Lionel Messi","Edison Cavani","Jonathan Cafu","Cristiano Ronaldo","Paul Pogba"],
      ["1-0","1-1","2-1","2-2","0-0"],
      ["Bayern Munich","Barcelona","Monaco","Liecester","Juventus"],
      ["Cristiano Ronaldo","Lionel Messi","Robert Lewandowski","Pierre-Emerick Aubaeyang","Eden Hazard"],
      ["Roman Burki","Gianlugi Buffon","Ederson","Thibaut Courtois","Kasper Schmiechel"],
      ["Lyon","Sporting CP","Kobenhavn","Liverpool","Tottenham"],
      [" Principality Stadium UKm","Old Trafford UK","Alianz Arena Germany","Parc des Princes","Camp Nou"],
      ["Roma vs Lyon","Chelsea vs Bayern Munich","PSG vs Barcelona","Real Madrid vs Juventus","Man City vs Dortmund"],
      ["Real Madrid","Monaco","Liverpool","Leverkusen","AC Milan"]
    ],
    answers: [2,1,3,0,1,4,2,0,3,0],    //Number code for answers index 0 number 2 corresponds to answer (index) of first question

    /////////////////OBJECT METHODS//////////////////
    //Random Question Generator with input choices//
      pickQuestion: function(){
          //creating forms and inputs for answers
          for (var i=0; i<5; i++){

              var ran = Math.floor(Math.random()*this.ranQuestions.length);
              var que = $("<h2>", {
                  text: this.ranQuestions[ran]
                });
                que.insertAfter($(".time"));

              var form = $("<form>");
              form.insertAfter(que);

              for (var j=0; j<5; j++){
                //generating radio type inputs with values and classes
                  var input = $('<input name = "choice"  class = ' +classInput+i.toString()+ ' type = "radio">'+'<span id="ans">'+this.ranAnswers[ran][j]+'</span></input>');
                      input.attr("value",this.ranAnswers[ran][j]);

                  form.append(input);
              }
          //Deleting the selected question from array to prevent repeating same process for answer arrays//
          selectedQuestions[i] = this.ranQuestions.splice(ran,1);
          selectedChoices[i]   = this.ranAnswers.splice(ran,1);
          selectedAnswers [i]  = this.answers.splice(ran,1);
          }
      },

//waits for players response to start the game Loads the quiz in the background//
    load: function(){
      $("#introSong").trigger("play");
      this.pickQuestion();
      $("#questions").hide();
      $("#results").hide();
    },
//Player clicks the start button and quiz starts timer ticking//
    start: function(){
      $("#start").hide();
      $("#questions").show();
      timer();
    },
//If player finishes quiz before time can click the done button to see results//
    done: function(){
      $("#results").show();
      $("#questions").hide();
      clearTimeout(time);
      click();
    }
};

//Global recursive Function TIMER - setTimeout used
function timer () {

      $("#countDown").html(count);
      count--;
      //recursive function callin it self till time is up
      if (count < 0){
      clearTimeout(time);
      click();
      $("#results").show();
      $("#questions").hide();
      }
      else {
      time = setTimeout(timer, 1000);
      }
}

//Global Function Calculates and records the result//
function click(){

          var numUnanswered = 0;
          var correctAnswers = 0;
          var incorrectAnswers = 0;

          //Possible 5 questions and answers going through all answers. Number 5 picked for convinience. It can be any number depending on number of questions.
          for (var i=0; i<5; i++){
              //Unanswered condition//
              if(!$('.'+classInput+i.toString()).is(":checked")) {
                   numUnanswered++;
              }
              //If the answer is correct or incorrect
              else {
              $("."+classInput+i.toString()+":checked").val() === selectedChoices[i][0][selectedAnswers[i][0]] ? (correctAnswers++) : (incorrectAnswers++);
              }
          }
          //Printing Results//
          $("#correct").html(correctAnswers);
          $("#incorrect").html(incorrectAnswers);
          $("#unAnswered").html(numUnanswered);

}
