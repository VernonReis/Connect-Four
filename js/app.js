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
        $column.append($('<div>').addClass('arrow'));

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

const placeToken = (event) => {
    // This is our event handler for clicking on a column
    const $column = $(event.currentTarget);
    const $slots = $column.children('.slot');

    // isOver kill condition
    if (isOver)
    {
        return 0;
    }

    for (let i = ($slots.length - 1); i >= 0; i--) {
        if ($slots.eq(i).children().length == 0) {
            const $token = $('<div>').addClass("token");
            $token.addClass(colors[turn % 2]);
            $token.hide();
            $slots.eq(i).append($token);
            $token.show("fast");

            if (isWinningMove($slots.eq(i), colors[turn % 2])) {
                isOver = true;
                if (colors[turn % 2] == 'red')
                {
                    playerScore++;
                    $('#playerScore').text("Player Score: " + playerScore);
                }
                else
                {
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


$(() => {

    // Dynamic generate the column divs and populate them with an arrow and slots
    makeBoard();

    // Event handler to add tokens
    $('.column').on('click', placeToken);
    $('#clearBoard').on('click', clearBoard);
    $('#fullReset').on('click', fullReset);


});
