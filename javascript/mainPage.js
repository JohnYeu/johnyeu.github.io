$(function() {
    $('<button>').attr('id', 'mainPageResumeButton').text('Resume').on("click", function() {
       $("#resume").css("display", "block");
       $("#snakeGame").css("display", "none");
    }).appendTo('.mainPageLeft');

    
    $('<button>').attr('id', 'mainPageSnakeGameButton').text('Snake Game').on("click", function() {
        $("#resume").css("display", "none");
        $("#snakeGame").css("display", "block");
        $("#snakeGameBoard > div:nth-of-type(1)").css("display", "flex");
        $("#snakeGameOver").css("display", "none");
        $("#snakeGameBoard > table").css("display", "none");
        prepareStartGame();
        

     }).appendTo('.mainPageLeft');




    
    
 });
 

 
 