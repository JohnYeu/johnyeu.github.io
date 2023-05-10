var TABLE_ROW = 30;
var TABLE_COLUMN = 37;

//array to save the snake body coordinate
var snake = [{x: 0, y: 0},
             {x: 1, y: 0},
             {x: 2, y: 0}];

var snakeTwo = [{x: 0, y: TABLE_ROW-1},
                   {x: 1, y: TABLE_ROW-1},
                   {x: 2, y: TABLE_ROW-1}];

var moveStates = {up: "Up", down: "Down", left: "Left", right: "Right"};
var moveState;
var food = [];
var score = 0;

let difficulty = new Map();
difficulty.set("easy", 500);
difficulty.set("normal", 200);
difficulty.set("difficult", 100);
var selectDiff = "normal";
var timer;

// define if Two Player game
var isTwoPlayer = false;
var moveStatesTwo = {up: "Up", down: "Down", left: "Left", right: "Right"};
var moveStateTwo;
var foodTwo;
var scoreTwo = 0;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// check if the coorinate given in snake body
function checkContain(x, y, inputSnake) {
    if (inputSnake && inputSnake.length) {
        for (var i = 0; i < inputSnake.length; i++) {
            if (inputSnake[i].x === x && inputSnake[i].y === y) return true;
        }
    }
    return false;
}

// ** control snake move 
function moveDown(inputSnake) {
    var newX = inputSnake[inputSnake.length-1].x;
    var newY = inputSnake[inputSnake.length-1].y + 1;
    if (inputSnake[inputSnake.length-1].y + 1 < TABLE_ROW) {
        //check collision
        if (isTwoPlayer) {
            if (inputSnake == snake && checkContain(snake[snake.length-1].x, snake[snake.length-1].y + 1, snakeTwo) === true) {
                gameOver(snake)
            }else if (inputSnake == snakeTwo && checkContain(snakeTwo[snakeTwo.length-1].x, snakeTwo[snakeTwo.length-1].y + 1, snake) === true) {
                gameOver(snakeTwo);
            }
        }else if (checkContain(newX, newY, inputSnake) === true) {
            gameOver(inputSnake);
        }

        //check if eat food
        if (checkContain(newX, newY, food)) {
            score++;
            $("#snakeGameScore").text(`Score: ${score}`);
            refreshFood(newX, newY);
        }else {
            inputSnake.shift();
        }
        
        inputSnake.push({x: newX, y: newY});
         
    }else {
        gameOver(inputSnake);
    }
    
}

function moveUp(inputSnake) {
    var newX = inputSnake[inputSnake.length-1].x;
    var newY = inputSnake[inputSnake.length-1].y - 1;
    if (inputSnake[inputSnake.length-1].y - 1 >= 0 ) {
        //check collision
        if (isTwoPlayer) {
            if (inputSnake == snake && checkContain(snake[snake.length-1].x, snake[snake.length-1].y - 1, snakeTwo) === true) {
                gameOver(snake);
            }else if (inputSnake == snakeTwo && checkContain(snakeTwo[snakeTwo.length-1].x, snakeTwo[snakeTwo.length-1].y - 1, snake) === true) {
                gameOver(snakeTwo);
            }
        }else if (checkContain(newX, newY, inputSnake) === true) {
            gameOver(inputSnake);
        }

        //check if eat food
        if (checkContain(newX, newY, food)) {
            score++;
            $("#snakeGameScore").text(`Score: ${score}`);
            refreshFood(newX, newY);
        }else {  
            inputSnake.shift();
        }
        inputSnake.push({x: newX, y: newY});
         
    }else {
        gameOver(inputSnake);
    }
}

function moveRight(inputSnake) {
    var newX = inputSnake[inputSnake.length-1].x + 1;
    var newY = inputSnake[inputSnake.length-1].y;
    if (inputSnake[inputSnake.length-1].x + 1 < TABLE_COLUMN) {
        //check collision
        if (isTwoPlayer) {
            if (checkContain(snake[snake.length-1].x + 1, snake[snake.length-1].y, snakeTwo) === true) {
                gameOver(snake);
            }else if (checkContain(snakeTwo[snakeTwo.length-1].x + 1, snakeTwo[snakeTwo.length-1].y, snake) === true) {
                gameOver(snakeTwo);
            }
        }else if (checkContain(newX, newY, inputSnake) === true) {
            gameOver(inputSnake);
        }

        //check if eat food
        if (checkContain(newX, newY, food)) {
            score++;
            $("#snakeGameScore").text(`Score: ${score}`);
            refreshFood(newX, newY);
        }else {
            inputSnake.shift();
        }
        
        inputSnake.push({x: newX, y: newY});
        
    }else {
        gameOver(inputSnake);
    }
}

function moveLeft(inputSnake) {
    var newX = inputSnake[inputSnake.length-1].x - 1;
    var newY = inputSnake[inputSnake.length-1].y;
    if (inputSnake[inputSnake.length-1].x - 1 >= 0 ) {
        //check collision
        if (isTwoPlayer) {
            if (checkContain(snake[snake.length-1].x - 1, snake[snake.length-1].y, snakeTwo) === true) {
                gameOver(snake);
            }else if (checkContain(snakeTwo[snakeTwo.length-1].x - 1, snakeTwo[snakeTwo.length-1].y, snake) === true) {
                gameOver(snakeTwo);
            }
        }else if (checkContain(newX, newY, inputSnake) === true) {
            gameOver(inputSnake);
        }

        //check if eat food
        if (checkContain(newX, newY, food)) {
            score++;
            $("#snakeGameScore").text(`Score: ${score}`);
            refreshFood(newX, newY);
        }else {
            inputSnake.shift();
        }
        
        inputSnake.push({x: newX, y: newY});
    
    }else {
        gameOver(inputSnake);
    }
}

//clear snake
function clearBody() {
    $('tr').eq(snake[snake.length-1].y).find('td').eq(snake[snake.length-1].x).removeClass("snakeHead");
    for (var i = 0; i < snake.length-1; i++) {
        $('tr').eq(snake[i].y).find('td').eq(snake[i].x).removeClass("snakeBody");
    }
    if (isTwoPlayer) {
        $('tr').eq(snakeTwo[snakeTwo.length-1].y).find('td').eq(snakeTwo[snakeTwo.length-1].x).removeClass("snakeTwoHead");
        for (var i = 0; i < snakeTwo.length-1; i++) {
            $('tr').eq(snakeTwo[i].y).find('td').eq(snakeTwo[i].x).removeClass("snakeTwoBody");
        } 
    } 
}

// draw the snake
function refresh() {
    $('tr').eq(snake[snake.length-1].y).find('td').eq(snake[snake.length-1].x).addClass("snakeHead");
    for (var i = 0; i < snake.length-1; i++) {
        $('tr').eq(snake[i].y).find('td').eq(snake[i].x).addClass("snakeBody");
    } 
    if (isTwoPlayer) {
        $('tr').eq(snakeTwo[snakeTwo.length-1].y).find('td').eq(snakeTwo[snakeTwo.length-1].x).addClass("snakeTwoHead");
        for (var i = 0; i < snakeTwo.length-1; i++) {
            $('tr').eq(snakeTwo[i].y).find('td').eq(snakeTwo[i].x).addClass("snakeTwoBody");
        } 
    }
    

}

// fresh and draw the food
function refreshFood(x, y) {
    $(".snakeFood img").remove();
    if (food !== undefined) {    
        var foodX = getRandomInt(0, TABLE_COLUMN-1);
        var foodY = getRandomInt(0, TABLE_ROW-1);
        var food2X = getRandomInt(0, TABLE_COLUMN-1);
        var food2Y = getRandomInt(0, TABLE_ROW-1);
        if (x == -1 && y == -1) {
            food = [];
            if (isTwoPlayer) {
                while (checkContain(foodX, foodY, snake) || checkContain(foodX, foodY, snakeTwo)) {
                    foodX = getRandomInt(0, TABLE_COLUMN-1);
                    foodY = getRandomInt(0, TABLE_ROW-1);
                }
                food.push({x: foodX, y: foodY});
                while (checkContain(food2X, food2Y, snake) || checkContain(food2X, food2Y, snakeTwo) || checkContain(food2X, food2Y, food)) {
                    food2X = getRandomInt(0, TABLE_COLUMN-1);
                    food2Y = getRandomInt(0, TABLE_ROW-1);
                }
                food.push({x: food2X, y: food2Y});
                for (var i = 0; i < food.length; i++) {
                    $('tr').eq(food[i].y).find('td').eq(food[i].x).addClass("snakeFood");
                }   
            }else {
                while (checkContain(foodX, foodY, snake)) {
                    foodX = getRandomInt(0, TABLE_COLUMN-1);
                    foodY = getRandomInt(0, TABLE_ROW-1);
                }
                food = [{x: foodX ,y: foodY}];
                $('tr').eq(food[0].y).find('td').eq(food[0].x).addClass("snakeFood");  
            }
        }else {
            $('tr').eq(y).find('td').eq(x).removeClass("snakeFood");
            if (isTwoPlayer) {
                while (checkContain(foodX, foodY, snake) || checkContain(foodX, foodY, snakeTwo) || checkContain(foodX, foodY, food)) {
                    foodX = getRandomInt(0, TABLE_COLUMN-1);
                    foodY = getRandomInt(0, TABLE_ROW-1);
                }
            }
            food = food.filter(item  => item.x !== x && item.y !== y);
            food.push({x: foodX, y: foodY});
            $('tr').eq(foodY).find('td').eq(foodX).addClass("snakeFood");
        }
        $(".snakeFood").append('<img src="picture/snakeFood.png" alt="Image"/>'); 
    }
    
}

// game over when collision happened
function gameOver(inputSnake) {
    $("#snakeGameBoard > table").css("display", "none");
    $("#snakeGameOver").css("display", "flex");
    if (!isTwoPlayer) {
        $("#snakeGameScore").text(`Score: ${score}`);
    }else {
        if (inputSnake == snake) {
            $("#snakeGameOver > div:nth-of-type(1) > h2:nth-of-type(2)").text(`Player 2 Win!`);
        }else {
            $("#snakeGameOver > div:nth-of-type(1) > h2:nth-of-type(2)").text(`Player 1 Win!`);
        }
    }
    $("#snakeGameOver > div:nth-of-type(1) > button:nth-of-type(1)").on("click", function() {
        $("#snakeGameBoard > table").css("display", "table");
        $("#snakeGameOver").css("display", "none");
        isTwoPlayer = false;
        $("#snakeGameBoard > table .snakeTwoHead").css("display", "none");
        $("#snakeGameBoard > table .snakeTwoBody").css("display", "none"); 
        prepareStartGame();

    });

    $("#snakeGameOver > div:nth-of-type(1) > button:nth-of-type(2)").on("click", function() {
        $("#snakeGameBoard > table").css("display", "table");
        $("#snakeGameOver").css("display", "none");
        isTwoPlayer = true; 
        $("#snakeGameBoard > table .snakeTwoHead").css("display", "table-cell");
        $("#snakeGameBoard > table .snakeTwoBody").css("display", "table-cell");
        prepareStartGame();
        
    });      
    if ($("#snakeGameBoard > div:nth-of-type(1)").css("display") !== "none") {
        $(`#snakeGameBoard > div:nth-of-type(1) .snakeGameDifficulty > label > input[value=${selectDiff}]:eq(0)`).click();
    }else if ($("#snakeGameOver").css("display") !== "none") {
        $(`#snakeGameOver .snakeGameDifficulty > label > input[value=${selectDiff}]`).click();
    }
}


//prepare for starting new game
function prepareStartGame() {
    clearBody();
    snake = [{x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0}];
    moveState = "";
    score = 0;

    if (isTwoPlayer) {
        snakeTwo = [{x: 0, y: TABLE_ROW-1},
            {x: 1, y: TABLE_ROW-1},
            {x: 2, y: TABLE_ROW-1}];
            moveStateTwo = "";
            scoreTwo = 0;
    }

    if ($("#snakeGameBoard > div:nth-of-type(1)").css("display") !== "none") {
        $(`#snakeGameBoard > div:nth-of-type(1) .snakeGameDifficulty > label > input[value=${selectDiff}]:eq(0)`).click();
    }else if ($("#snakeGameOver").css("display") !== "none") {
        $(`#snakeGameOver .snakeGameDifficulty > label > input[value=${selectDiff}]`).click();
    }
    
    $(".snakeFood img").remove();
    $(".snakeFood").removeClass();
    refreshFood(-1,-1);
    
    
}

//set difficulty
function setDifficulty() {
    if (timer !== undefined) {
        clearInterval(timer);
    }
    timer = setInterval(function() {
        if ($("#snakeGame").css("display") === "block") {
            clearBody();
            switch (moveState) {
                case "Up":
                    moveUp(snake);
                    break;
                case "Down":
                    moveDown(snake);
                    break;
                case "Left":
                    moveLeft(snake);
                    break;
                case "Right":
                    moveRight(snake);
                    break;
            }
            if (isTwoPlayer) {
                switch (moveStateTwo) {
                    case "Up":
                        moveUp(snakeTwo);
                        break;
                    case "Down":
                        moveDown(snakeTwo);
                        break;
                    case "Left":
                        moveLeft(snakeTwo);
                        break;
                    case "Right":
                        moveRight(snakeTwo);
                        break;
                }
            }
            refresh();
        }        
        
    },difficulty.get(selectDiff));

} 


$(function() {
    $("#snakeGameBoard > div:nth-of-type(1) button").on("click", function() {
        $("#snakeGameBoard > div:nth-of-type(1)").css("display", "none");
        $("#snakeGameBoard > table").css("display", "table");
    });

    $("#snakeGameBoard > div:nth-of-type(1) button:nth-of-type(1)").on("click", function() {
        isTwoPlayer = false;
        prepareStartGame();
        refresh();
        $("#snakeGameBoard > table .snakeTwoHead").css("display", "none");
        $("#snakeGameBoard > table .snakeTwoBody").css("display", "none");
    });
    $("#snakeGameBoard > div:nth-of-type(1) button:nth-of-type(2)").on("click", function() {
        isTwoPlayer = true;
        prepareStartGame();
        refresh();
        $("#snakeGameBoard > table .snakeTwoHead").css("display", "table-cell");
        $("#snakeGameBoard > table .snakeTwoBody").css("display", "table-cell");
    });
     


    //create radio for choosing difficulty level
    var container = $('<div>').attr('class', 'snakeGameDifficulty').appendTo("#snakeGameBoard > div:nth-of-type(1), #snakeGameOver");

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
    for (var i = 0; i < TABLE_ROW; i++) {
        var row = $('<tr>');
        for (var j = 0; j < TABLE_COLUMN; j++) {
            row.append($("<td>"));     
        }
        snakeBoard.append(row);
    }

    $('tr').eq(snake[snake.length-1].y).find('td').eq(snake[snake.length-1].x).addClass("snakeHead");
    for (var i = 0; i < snake.length-1; i++) {
        $('tr').eq(snake[i].y).find('td').eq(snake[i].x).addClass("snakeBody");
    }
  
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

    //control direction for second player
    $(document).on('keydown', function(e) {
        if ($("#snakeGame").css("display") === "block" && isTwoPlayer) { 
            switch (e.key){
                case 'w':
                    moveStateTwo = moveStatesTwo.up;
                    break;
                case 's':
                    moveStateTwo = moveStatesTwo.down;
                    break;
                case 'a':
                    moveStateTwo = moveStatesTwo.left;
                    break;
                case 'd':
                    moveStateTwo = moveStatesTwo.right;
                    break;              

            }
        }
        });
 
    
    




});

