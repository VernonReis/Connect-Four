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
    const thisTurn = turn;
    const $column = $(event.currentTarget);
    placeToken($column);

    if (turn == 2) {
        disableRadio();
    }

    if (boardFull() && !isOver) {
        isOver = true;

        $('#tieModal').css('display', 'flex');
        setTimeout(() => {
            $('#tieModal').css('display', 'none');
            clearBoard();
        }, 3000);
    }

    if (!isOver && thisTurn != turn) {

        if ($('#easy:checked').length == 1) {

            cpuEasy();
        }

        if ($('#hard:checked').length == 1) {
            cpuHard();
        }

        if (boardFull()) {
            isOver = true;

            $('#tieModal').css('display', 'flex');
            setTimeout(() => {
                $('#tieModal').css('display', 'none');
                clearBoard();
            }, 3000);
        }
    }
}

const placeToken = ($column) => {
    const $slots = $column.children('.slot');

    // isOver kill condition
    if (isOver) {
        return 0;
    }


    // iterate over the column in question to find the bottom empty slot and place a token
    for (let i = ($slots.length - 1); i >= 0; i--) {
        if ($slots.eq(i).children().length == 0) {
            const $token = $('<div>').addClass("token");
            $token.addClass(colors[turn % 2]);
            $token.hide();
            $slots.eq(i).append($token);
            if (turn % 2 == 0 && (($('#easy:checked').length == 1) || ($('#hard:checked').length == 1)))
                {
                setTimeout(() => { $token.show('bounce', 'ease-in', 900) }, 250);
            }
            else {
                $token.show('bounce', 'ease-in', 900);
            }

            // Win condition handler
            if (isWinningMove($slots.eq(i), colors[turn % 2])) {
                console.log('slot: ' + $slots);
                console.log('i: ' + i);
                isOver = true;
                if (colors[turn % 2] == 'red') {
                    playerScore++;
                    $('#playerScore').text("Player Score: " + playerScore);

                    // MODAL CODE
                    // If we are vs human
                    if ($('#off:checked').length == 1) {
                        $('#playerOneWinModal').css('display', 'flex');
                        setTimeout(() => {
                            $('#playerOneWinModal').css('display', 'none');
                            clearBoard();
                        }, 3000);

                    }
                    else {
                        // If we are vs CPU
                        $('#youWinModal').css('display', 'flex');
                        setTimeout(() => {
                            $('#youWinModal').css('display', 'none');
                            clearBoard();
                        }, 3000);

                    }
                }
                else {
                    cpuScore++;
                    $('#cpuScore').text("Computer Score: " + cpuScore);

                    // Winner is 2nd human player
                    if ($('#off:checked').length == 1) {
                        $('#playerTwoWinModal').css('display', 'flex');
                        setTimeout(() => {
                            $('#playerTwoWinModal').css('display', 'none');
                            clearBoard();
                        }, 3000);

                    }
                    else {
                        // Winner is CPU
                        $('#cpuWinModal').css('display', 'flex');
                        setTimeout(() => {
                            $('#cpuWinModal').css('display', 'none');
                            clearBoard();
                        }, 3000);


                    }
                }
            }

            turn++;
            i = 0;
        }
    }
}


// Tie checker
const boardFull = () => {
    const $columns = $('.column');
    for (let i = 0; i < $columns.length; i++) {
        const $slots = $columns.eq(i).children('.slot');
        for (let j = 0; j < $slots.length; j++) {
            if ($slots.eq(j).children().length == 0) {
                return false;
            }
        }
    }
    return true;
}

// Lock the mode selector
const disableRadio = () => {
    $('#easy').attr('disabled', 'true');
    $('#hard').attr('disabled', 'true');
    $('#off').attr('disabled', 'true');
}

// Unlock the mode selector
const enableRadio = () => {
    $('#easy').removeAttr('disabled');
    $('#hard').removeAttr('disabled');
    $('#off').removeAttr('disabled');
}

// Reset board fxn
const clearBoard = (event) => {
    $('.slot').children().remove();
    turn = 1;
    isOver = false;
    enableRadio();
}

// Reset board and scores fxn
const fullReset = (event) => {
    $('.slot').children().remove();
    $('#playerScore').text("Player Score: 0");
    $('#cpuScore').text("Computer Score: 0");
    playerScore = 0;
    cpuScore = 0;
    turn = 1;
    isOver: false;
    enableRadio();
}

const cpuHard = () => {
    // CPU strategy as follows
    // 1. Check to see if can make a winning move
    // 2. Else check to see if the player can make a winning move, if so block it
    // 3. Else generate a random choice

    // function global
    const $columns = $('.column');
    let foundRandom = false;
    // token for play
    const $token = $('<div>').addClass("token");
    $token.addClass(colors[turn % 2]);

    // 1. Check through the 7 columns to see if they will work
    for (let i = 0; i < $columns.length; i++) {
        const $slots = $columns.eq(i).children('.slot');
        for (let j = ($slots.length - 1); j >= 0; j--) {

            if ($slots.eq(j).children().length == 0) {
                // found out empty slot, check if its a winner
                if (isWinningMove($slots.eq(j), colors[turn % 2])) {
                    // We have a winnner, place token and set win to over
                    $token.hide();
                    $slots.eq(j).append($token);
                    setTimeout(() => { $token.show('bounce', 'ease-in', 900) }, 250);
                    turn++;
                    isOver = true;
                    cpuScore++;
                    $('#cpuScore').text("Computer Score: " + cpuScore);

                    // PLACE MODAL CODE HERE
                    $('#cpuWinModal').css('display', 'flex');
                    setTimeout(() => {
                        $('#cpuWinModal').css('display', 'none');
                        clearBoard();
                    }, 3000);

                    // Terminate the function
                    return 0;
                }
                j = -1;
            }
        }
    }

    // 2. Check to see if can block winning move
    for (let i = 0; i < $columns.length; i++) {
        const $slots = $columns.eq(i).children('.slot');
        for (let j = ($slots.length - 1); j > 0; j--) {
            if ($slots.eq(j).children().length == 0) {
                // found out empty slot, check if its a winner

                if (isWinningMove($slots.eq(j), colors[(turn + 1) % 2])) {
                    // found a potential win move for the player, block it
                    $token.hide();
                    $slots.eq(j).append($token);
                    setTimeout(() => { $token.show('bounce', 'ease-in', 900) }, 250);
                    turn++;


                    // Terminate the function
                    return 0;
                }
                j = 0;
            }
        }
    }

    const thisTurn = turn;

    // Random move
    while (thisTurn == turn) {
        const randomCol = Math.floor(Math.random() * 7);
        const $column = $('.column').eq(randomCol);
        placeToken($column);
    }



}




// Just makes random moves
const cpuEasy = () => {
    const thisTurn = turn;

    while (thisTurn == turn) {
        const randomCol = Math.floor(Math.random() * 7);
        const $column = $('.column').eq(randomCol);
        placeToken($column);
    }
}

// Utility fxn
const slotAt = (x, y) => {

    // This function takes an x,y coordinate and returns the token at the position on the game board
    // 0,0 being bottom left 
    // 6,5 being top right
    const $slots = $('.column').eq(x).children('.slot');

    return $slots.eq(($slots.length - 1) - y);
}

// Utility fxn
// Returns array containing coords of a given slot
const getCoords = ($slot) => {
    const coords = [];
    coords[0] = Number($slot.attr('column'));
    coords[1] = Number($slot.attr('row'));

    return coords;
}

// Utility fxn
// Returns the color of token inside given slot
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

// WIN CHECKER
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
        if (thisColor == color) {
            contiguous++;
        }
        else {
            break;
        }
    }

    // Check to the right
    for (let i = 1; i < 4 && (xCoord + i) < 7; i++) {
        const thisColor = getColor(slotAt(xCoord + i, yCoord));
        if (thisColor == color) {
            contiguous++;
        }
        else {
            break;
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
        if (thisColor == color) {
            contiguous++;
        }
        else {
            break;
        }
    }

    // Check up
    for (let i = 1; i < 4 && (yCoord + i) < 6; i++) {
        const thisColor = getColor(slotAt(xCoord, yCoord + i));
        if (thisColor == color) {
            contiguous++;
        }
        else {
            break;
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
        if (thisColor == color) {
            contiguous++;
        }
        else {
            break;
        }

    }

    for (let i = 1; i < 4 && (xCoord - i) >= 0 && (yCoord - i) >= 0; i++) {
        const thisColor = getColor(slotAt(xCoord - i, yCoord - i));
        if (thisColor == color) {
            contiguous++;
        }
        else if (thisColor == color) {
            i = 4;
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
        if (thisColor == color) {
            contiguous++;
        }
        else {
            break;
        }

    }

    for (let i = 1; i < 4 && (xCoord - i) >= 0 && (yCoord + i) < 6; i++) {
        const thisColor = getColor(slotAt(xCoord - i, yCoord + i));
        if (thisColor == color) {
            contiguous++;
        }
        else {
            break;
        }
    }
    if (contiguous >= 4) {
        return true;
    }

    // no winning moves, return false
    return false;

}

// Start arrow animation on mouseenter of parent column div
const startBounce = (event) => {
    $arrow = $(event.currentTarget).children().eq(0).css('animation-name', 'bounce');;
}

// Start arrow animation on mouseleave of parent column div
const stopBounce = (event) => {
    $arrow = $(event.currentTarget).children().eq(0);
    $arrow.css('animation-name', '');
}


$(() => {

    // Dynamic generate the column divs and populate them with an arrow and slots
    makeBoard();

    // Event handlers

    // Place token
    $('.column').on('click', clickHandler);

    // Start stop animation for arrows
    $('.column').on('mouseenter', startBounce);
    $('.column').on('mouseleave', stopBounce);

    // Reset button handlers
    $('#clearBoard').on('click', clearBoard);
    $('#fullReset').on('click', fullReset);
    

});
