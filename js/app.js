let turn = 1;
const colors = ['black', 'red'];

const makeBoard = () =>
{
    const $gameBoard = $('#gameBoard');
    for (let i = 0; i < 7; i++)
    {
        // Generate a new column and append the arrow
        const $column = $('<div>').addClass('column');
        $column.append($('<div>').addClass('arrow'));

        // Append 6 slots to each column below the arrow
        for (let j = 0; j < 6; j++)
        {
            const $slot = $('<div>').addClass('slot');
            $slot.attr("column", i);
            $slot.attr("row", 5- j)
            $column.append($slot);
        }
        $gameBoard.append($column);
    }
}

// This function takes an x,y coordinate and returns the token at the position on the game board
// 0,0 being bottom left 
// 6,5 being top right
const tokenAt = (x, y) => {
    const $slots = $('.column').eq(x).children('.slot');

    return $slots.eq(($slots.length - 1) - y);
}

const getCoords = ($token) =>
{
    const coords = [];
    coords[0] = $token.attr('column');
    coords[1] = $token.attr('row');

    return coords;
}

const placeToken = (event) =>
{
    // This is our event handler for clicking on a column
    const $column = $(event.currentTarget);
    const $slots = $column.children('.slot');

    for (let i = ($slots.length - 1); i >= 0; i--)
    {
        if ($slots.eq(i).children().length == 0)
        {
            const $token = $('<div>').addClass("token");
            $token.addClass(colors[turn % 2])
            $slots.eq(i).append($token);
            turn++;
            i = 0;
        }
    }
}





$(() => {

    // Dynamic generate the column divs and populate them with an arrow and slots
    makeBoard();

    // Event handler to add tokens
    $('.column').on('click', placeToken);

});
