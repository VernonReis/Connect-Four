let turn = 1;
const colors = ['black', 'red'];
let playerScore = 0;
let cpuScore = 0;
let isOver = false;

const makeBoard = () => {
    const $gameBoard = $('#gameBoard');
    for (let i = 0; i < 7; i++) {
        // Generate a new column and append the arrow
        const $column = $('<div>').addClass('column');
        const $arrow = $('<div>').addClass('arrow');
        
        $column.append($arrow);

        // Append 6 slots to each column below the arrow
        for (let j = 0; j < 6; j++) {
            const $slot = $('<div>').addClass('slot');
            $slot.attr("column", i);
            $slot.attr("row", 5 - j)
            $column.append($slot);
        }
        $gameBoard.append($column);
    }
}

const clickHandler = (event) => {
    // This is our event handler for clicking on a column
    const $column = $(event.currentTarget);
    placeToken($column);
    if (!isOver)
    {
        cpuEasy();
    }
}

const placeToken = ($column) =>
{
    const $slots = $column.children('.slot');

    // isOver kill condition
    if (isOver) {
        return 0;
    }

    for (let i = ($slots.length - 1); i >= 0; i--) {
        if ($slots.eq(i).children().length == 0) {
            const $token = $('<div>').addClass("token");
            $token.addClass(colors[turn % 2]);
            $token.hide();
            $slots.eq(i).append($token);
            $token.show('bounce', 'ease-in', 900);

            if (isWinningMove($slots.eq(i), colors[turn % 2])) {
                isOver = true;
                if (colors[turn % 2] == 'red') {
                    playerScore++;
                    $('#playerScore').text("Player Score: " + playerScore);
                }
                else {
                    cpuScore++;
                    $('#cpuScore').text("Computer Score: " + cpuScore);
                }
            }

            turn++;
            i = 0;
        }
    }
}

const clearBoard = (event) => {
    $('.token').remove();
    turn = 1;
    isOver = false;
}

const fullReset = (event) => {
    $('.token').remove();
    $('#playerScore').text("Player Score: 0");
    $('#cpuScore').text("Computer Score: 0");
    playerScore = 0;
    cpuScore = 0;
    turn = 1;
    isOver: false;

}

const cpuHard = () =>
{
    // CPU strategy as follows
    // 1. Check to see if can make a winning move
    // 2. Else check to see if the player can make a winning move, if so block it
    // 3. Else generate a random choice, double check choice won't set player up for a win

    // function global
    const $columns = $('.column');
    let foundRandom = false;
    // token for play
    const $token = $('<div>').addClass("token");
    $token.addClass(colors[turn % 2]);

    // 1. Check through the 7 columns to see if they will work
    for (let i = 0; i > $columns.length; i++)
    {
        const $slots = $columns.eq(i).children('.slot');
        for (let j = ($slots.length - 1); j >= 0; j--) {
            if ($slots.eq(j).children().length == 0) {
                // found out empty slot, check if its a winner
                if (isWinningMove($slots.eq(j), colors[turn % 2]))
                {
                    // We have a winnner, place token and set win to over


                    $slots.eq(j).append($token);
                    turn++;
                    isOver = true;
                    cpuScore++;
                    $('#cpuScore').text("Computer Score: " + cpuScore);

                    // PLACE MODAL CODE HERE


                    // Terminate the function
                    return 0;
                }
            }
        }
    }

    // 2. Check to see if can block winning move
    for (let i = 0; i > $columns.length; i++) {
        const $slots = $columns.eq(i).children('.slot');
        for (let j = ($slots.length - 1); j > 0; j--) {
            if ($slots.eq(j).children().length == 0) {
                // found out empty slot, check if its a winner
                if (isWinningMove($slots.eq(j), colors[(turn+1) % 2])) {
                    // found a potential win move for the player, block it
                    $slots.eq(j).append($token);
                    turn++;
                    // PLACE MODAL CODE HERE


                    // Terminate the function
                    return 0;
                }
            }
        }
    }

    while (!foundRandom)
    {
        const randomCol = Math.floor(Math.random() * 7);
        const $slots = $columns.eq(randomCol).children();
        for (let j = ($slots.length - 1); j >= 0; j--) {
            if ($slots.eq(j).children().length == 0) {
                // Found an empty slot, check to see slot above won't win for player
                    // made sure player won't win off this move'
                    $slots.eq(j).append($token);
                    turn++;

                    // PLACE MODAL CODE HERE


                    // Terminate the function
                    return 0;
                
            }
        }
    }



}





const cpuEasy = () =>
{
    const thisTurn = turn;

    while (thisTurn == turn)
    {
        const randomCol = Math.floor(Math.random() * 7);
        const $column = $('.column').eq(randomCol);
        placeToken($column);
    }
}


const slotAt = (x, y) => {

    // This function takes an x,y coordinate and returns the token at the position on the game board
    // 0,0 being bottom left 
    // 6,5 being top right
    const $slots = $('.column').eq(x).children('.slot');

    return $slots.eq(($slots.length - 1) - y);
}

const getCoords = ($slot) => {
    const coords = [];
    coords[0] = Number($slot.attr('column'));
    coords[1] = Number($slot.attr('row'));

    return coords;
}

const getColor = ($slot) => {
    // First make sure theres a token in the slot
    if ($slot.children().length == 0) {
        return 'none';
    }
    else if ($slot.children().eq(0).hasClass('red')) {
        return 'red';
    }
    else {
        return 'black';
    }
}


const isWinningMove = ($slot, color) => {
    // Going to have to do 3 checks here
    // 1. Horizontal win
    // 2. Vertical win
    // 3. Diagonal win
    let contiguous = 1;
    const xCoord = getCoords($slot)[0];
    const yCoord = getCoords($slot)[1];
    // Horizontal win checker

    // Check to the left
    for (let i = 1; i < 4 && (xCoord - i) >= 0; i++) {
        const thisColor = getColor(slotAt(xCoord - i, yCoord));
        if (thisColor == 'none') {
            i = 4;
        }
        else if (thisColor == color) {
            contiguous++;
        }
    }

    // Check to the right
    for (let i = 1; i < 4 && (xCoord + i) < 7; i++) {
        const thisColor = getColor(slotAt(xCoord + i, yCoord));
        if (thisColor == 'none') {
            i = 4;
        }
        else if (thisColor == color) {
            contiguous++;
        }
    }

    if (contiguous >= 4) {
        return true;
    }

    // reset contiguous
    contiguous = 1;


    // Vertical win checker
    // Check down
    for (let i = 1; i < 4 && (yCoord - i) >= 0; i++) {
        const thisColor = getColor(slotAt(xCoord, yCoord - i));
        if (thisColor == 'none') {
            i = 4;
        }
        else if (thisColor == color) {
            contiguous++;
        }
    }

    // Check to the right
    for (let i = 1; i < 4 && (yCoord + i) < 6; i++) {
        const thisColor = getColor(slotAt(xCoord, yCoord + i));
        if (thisColor == 'none') {
            i = 4;
        }
        else if (thisColor == color) {
            contiguous++;
        }
    }


    if (contiguous >= 4) {
        return true;
    }

    // reset contiguous
    contiguous = 1;

    //diagonal check 1

    for (let i = 1; i < 4 && (xCoord + i) < 7 && (yCoord + i) < 6; i++) {
        const thisColor = getColor(slotAt(xCoord + i, yCoord + i));
        if (thisColor == 'none') {
            i = 4;
        }
        else if (thisColor == color) {
            contiguous++;
        }

    }

    for (let i = 1; i < 4 && (xCoord - i) >= 0 && (yCoord - i) >= 0; i++) {
        const thisColor = getColor(slotAt(xCoord - i, yCoord - i));
        if (thisColor == 'none') {
            i = 4;
        }
        else if (thisColor == color) {
            contiguous++;
        }
    }
    if (contiguous >= 4) {
        return true;
    }

    // reset contiguous
    contiguous = 1;

    // diagonal check 2
    for (let i = 1; i < 4 && (xCoord + i) < 7 && (yCoord - i) >= 0; i++) {
        const thisColor = getColor(slotAt(xCoord + i, yCoord - i));
        if (thisColor == 'none') {
            i = 4;
        }
        else if (thisColor == color) {
            contiguous++;
        }

    }

    for (let i = 1; i < 4 && (xCoord - i) >= 0 && (yCoord + i) < 6; i++) {
        const thisColor = getColor(slotAt(xCoord - i, yCoord + i));
        if (thisColor == 'none') {
            i = 4;
        }
        else if (thisColor == color) {
            contiguous++;
        }
    }
    if (contiguous >= 4) {
        return true;
    }


    return false;

}

const startBounce = (event) => {    
    $arrow = $(event.currentTarget).children().eq(0).css('animation-name', 'bounce');;
}

const stopBounce = (event) => {
    $arrow = $(event.currentTarget).children().eq(0);
    $arrow.css('animation-name', '');
}


$(() => {

    // Dynamic generate the column divs and populate them with an arrow and slots
    makeBoard();

    // Event handler to add tokens
    $('.column').on('click', clickHandler);
    $('.column').on('mouseenter', startBounce);
    $('.column').on('mouseleave', stopBounce);
    $('#clearBoard').on('click', clearBoard);
    $('#fullReset').on('click', fullReset);
    ;

});
