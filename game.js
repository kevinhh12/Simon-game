var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var first = true;

var randomNumber = getRandomIntInclusive(0,3);
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence(randomNumber){
    userClickedPattern = [];
    $('h1').text(`level ${level}`);
    level++;

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    animatePress(randomChosenColour);
    var sound = new Audio(`./sounds/${randomChosenColour}.mp3`);
    sound.play();
    
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }

$(`.btn`).on("click",function(event){
    var userChosenColour = event.target.id ;
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});
function playSound(name){
    animatePress(name);
    var usr_sound = new Audio(`./sounds/${name}.mp3`);
    usr_sound.play();
}

function animatePress(currentColour){

    $(`.${currentColour}`).addClass("pressed");
    setTimeout(function(){
        $(`.${currentColour}`).removeClass("pressed");
    },100);

}

$(document).on("keydown",function(){
    if (first){
        nextSequence(randomNumber);
        first = false;
    }
   
});

function checkAnswer(currentLevel){
    
    if ( userClickedPattern[currentLevel] === gamePattern[currentLevel] ) {
        if (userClickedPattern.length === gamePattern.length ) {
            setTimeout(function(){
            nextSequence(getRandomIntInclusive(0,3));
            },1000);
            
        }
    }
    else{
        $("body").addClass('game-over');
        setTimeout(function(){
            $("body").removeClass('game-over');
        },200);
        $("h1").text(`Game Over, Press Any Key to Restart`);
        playSound("wrong");
        startOver();

        console.log("wrong");
    }
}

function startOver() {
    level = 0;
    gamePattern = [];    
    first = true;
    randomNumber = getRandomIntInclusive(0,3);
}

