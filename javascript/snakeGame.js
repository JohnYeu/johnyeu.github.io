//array to save the snake body coordinate
var snake = [{x: 0, y: 0},
                 {x: 1, y: 0},
                 {x: 2, y: 0}];

var moveStates = {up: "Up", down: "Down", left: "Left", right: "Right"};
var moveState;
var food;
var score = 0;
var TABLE_ROW = 30;
var TABLE_COLUMN = 37;
let difficulty = new Map();
difficulty.set("easy", 500);
difficulty.set("normal", 200);
difficulty.set("difficult", 100);
var selectDiff = "normal";
var timer;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// check if the coorinate given in snake body
function checkContain(x, y) {
    for (var i = 0; i < snake.length; i++) {
        if (snake[i].x === x && snake[i].y === y) return true;
    }
    return false;
}

// ** control snake move 
function moveDown() {
    clearBody();
    if (snake[snake.length-1].y + 1 < TABLE_ROW) {
        //check collision
        if (checkContain(snake[snake.length-1].x, snake[snake.length-1].y + 1) === true) {
            gameOver();
        }else {
            //check if eat food
            if (snake[snake.length-1].x === food.x && snake[snake.length-1].y + 1 === food.y) {
                score++;
                $("#snakeGameScore").text(`Score: ${score}`);
                refreshFood();
            }else {
                snake.shift();
            }
            
            var newX = snake[snake.length-1].x;
            var newY = snake[snake.length-1].y + 1;
            snake.push({x: newX, y: newY});
        } 
    }else {
        gameOver();
    }
    
}

function moveUp() {
    clearBody(); 
    if (snake[snake.length-1].y - 1 >= 0 ) {
        //check collision
        if (checkContain(snake[snake.length-1].x, snake[snake.length-1].y - 1) === true) {
            gameOver();
        }else {
            //check if eat food
            if (snake[snake.length-1].x === food.x && snake[snake.length-1].y - 1 === food.y) {
                score++;
                $("#snakeGameScore").text(`Score: ${score}`);
                refreshFood();
            }else {  
                snake.shift();
            }
            
            var newX = snake[snake.length-1].x;
            var newY = snake[snake.length-1].y - 1;
            snake.push({x: newX, y: newY});
        } 
    }else {
        gameOver();
    }
}

function moveRight() {
    clearBody(); 
    if (snake[snake.length-1].x + 1 < TABLE_COLUMN) {
        //check collision
        if (checkContain(snake[snake.length-1].x + 1, snake[snake.length-1].y) === true) {
            gameOver();
        }else {
            //check if eat food
            if (snake[snake.length-1].x + 1 === food.x && snake[snake.length-1].y === food.y) {
                score++;
                $("#snakeGameScore").text(`Score: ${score}`);
                refreshFood();
            }else {
                snake.shift();
            }
            
            var newX = snake[snake.length-1].x + 1;
            var newY = snake[snake.length-1].y;
            snake.push({x: newX, y: newY});
        }
    }else {
        gameOver();
    }
}

function moveLeft() {
    clearBody(); 
    if (snake[snake.length-1].x - 1 >= 0 ) {
        //check collision
        if (checkContain(snake[snake.length-1].x - 1, snake[snake.length-1].y) === true) {
            gameOver();
        }else {
            //check if eat food
            if (snake[snake.length-1].x - 1 === food.x && snake[snake.length-1].y === food.y) {
                score++;
                $("#snakeGameScore").text(`Score: ${score}`);
                refreshFood();
            }else {
                snake.shift();
            }
            
            var newX = snake[snake.length-1].x - 1;
            var newY = snake[snake.length-1].y;
            snake.push({x: newX, y: newY});
        }
    }else {
        gameOver();
    }
}

//clear snake
function clearBody() {
    $('tr').eq(snake[snake.length-1].y).find('td').eq(snake[snake.length-1].x).removeClass("snakeHead");
    for (var i = 0; i < snake.length-1; i++) {
        $('tr').eq(snake[i].y).find('td').eq(snake[i].x).removeClass("snakeBody");
    } 
}

// draw the snake
function refresh() {
    $('tr').eq(snake[snake.length-1].y).find('td').eq(snake[snake.length-1].x).addClass("snakeHead");
    for (var i = 0; i < snake.length-1; i++) {
        $('tr').eq(snake[i].y).find('td').eq(snake[i].x).addClass("snakeBody");
    } 

}

// fresh and draw the food
function refreshFood() {
    $(".snakeFood img").remove()
    if (food !== undefined) {
        $('tr').eq(food.y).find('td').eq(food.x).removeClass("snakeFood");
    }
    var foodX = getRandomInt(0, 29);
    var foodY = getRandomInt(0, 29);
    while (checkContain(foodX, foodY)) {
        foodX = getRandomInt(0, 29);
        foodY = getRandomInt(0, 29);
    }

    food = {x: foodX ,y: foodY};
    $('tr').eq(food.y).find('td').eq(food.x).addClass("snakeFood");
    $(".snakeFood").append('<img src="picture/snakeFood.png" alt="Image"/>')
    
}

// game over when collision happened
function gameOver() {
    $("#snakeGameBoard > table").css("display", "none");
    $("#snakeGameBoard > div:nth-of-type(2)").css("display", "flex");
    $("#snakeGameBoard > div:nth-of-type(2) > h2:nth-of-type(2)").text(`Score: ${score}`);
    $("#snakeGameBoard > div:nth-of-type(2) > button").on("click", function() {
        $("#snakeGameBoard > table").css("display", "table");
        $("#snakeGameBoard > div:nth-of-type(2)").css("display", "none");
        
     });
    
    $("#snakeGameScore").text(`Score: ${score}`);

    startGame();

}


//prepare for starting new game
function startGame() {
    clearBody();
    snake = [{x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0}];
    moveState = "";
    score = 0;
    if ($("#snakeGameBoard > div:nth-of-type(1)").css("display") !== "none") {
        $(`#snakeGameBoard > div:nth-of-type(1) .snakeGameDifficulty > label > input[value=${selectDiff}]:eq(0)`).click();
    }else if ($("#snakeGameBoard > div:nth-of-type(2)").css("display") !== "none") {
        $(`#snakeGameBoard > div:nth-of-type(2) .snakeGameDifficulty > label > input[value=${selectDiff}]`).click();
    }
    
    
}

//set difficulty
function setDifficulty() {
    if (timer !== undefined) {
        clearInterval(timer);
    }
    timer = setInterval(function() {
        if ($("#snakeGame").css("display") === "block") {
            switch (moveState) {
                case "Up":
                    moveUp();
                    break;
                case "Down":
                    moveDown();
                    break;
                case "Left":
                    moveLeft();
                    break;
                case "Right":
                    moveRight();
                    break;
            }
            refresh();
        }        
        
    },difficulty.get(selectDiff));

} 


$(function() {
    $("#snakeGameBoard > div:nth-of-type(1) > button").on("click", function() {
        $("#snakeGameBoard > div:nth-of-type(1)").css("display", "none");
        $("#snakeGameBoard > table").css("display", "table");
        startGame();
        refresh();
     });

     //create radio for choosing difficulty level
     var container = $('<div>').attr('class', 'snakeGameDifficulty').appendTo("#snakeGameBoard > div:nth-of-type(1), #snakeGameBoard > div:nth-of-type(2)");

     var option1 = $('<input>').attr({
        type: 'radio',
        name: 'difficulty',
        value: "easy"
      });
      var label1 = $('<label>').append(option1, 'Easy').appendTo(container);
      
      var option2 = $('<input>').attr({
        type: 'radio',
        name: 'difficulty',
        value: "normal",
        checked: true
      });
      var label2 = $('<label>').append(option2, 'Normal').appendTo(container);
      
      var option3 = $('<input>').attr({
        type: 'radio',
        name: 'difficulty',
        value: "difficult"
      });
      var label3 = $('<label>').append(option3, 'Difficult').appendTo(container);

      $('input[name="difficulty"]:eq(1)').click();



      $('input[name="difficulty"]').on('change', function() {
        selectDiff = $('input[name="difficulty"]:checked').val();
        setDifficulty();

      });




    //create game dashboard
    var snakeBoard = $("#snakeGameBoard > table");
    for (var i = 1; i <= TABLE_ROW; i++) {
        var row = $('<tr>');
        for (var j = 1; j <= 37; j++) {
            row.append($("<td>"));     
        }
        snakeBoard.append(row);
    }

    $('tr').eq(snake[snake.length-1].y).find('td').eq(snake[snake.length-1].x).addClass("snakeHead");
    for (var i = 0; i < snake.length-1; i++) {
        $('tr').eq(snake[i].y).find('td').eq(snake[i].x).addClass("snakeBody");
    }
    refreshFood();
  
    $("#snakeGameBoard > table").append(snakeBoard); 

    //refresh page
    setDifficulty(200);
    

    //control direction
    $(document).on('keydown', function(e) {
        if ($("#snakeGame").css("display") === "block") { 
            switch (e.key){
                case "ArrowUp":
                    moveState = moveStates.up;
                    break;
                case "ArrowDown":
                    moveState = moveStates.down;
                    break;
                case "ArrowLeft":
                    moveState = moveStates.left;
                    break;
                case "ArrowRight":
                    moveState = moveStates.right;
                    break;
    
            }
        }
        });
    




});

