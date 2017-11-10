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
const slotAt = (x, y) => {
    const $slots = $('.column').eq(x).children('.slot');

    return $slots.eq(($slots.length - 1) - y);
}

const getCoords = ($slot) =>
{
    const coords = [];
    coords[0] = $slot.attr('column');
    coords[1] = $slot.attr('row');

    return coords;
}

const getColor = ($slot) =>
{
    // First make sure theres a token in the slot
    if ($slot.children().length == 0)
    {
        return 'none';
    }
    else if ($slot.children().eq(0).hasClass('red'))
    {
        return 'red';
    }
    else
    {
        return 'black';
    }
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
            $token.addClass(colors[turn % 2]);
            $token.hide();
            $slots.eq(i).append($token);
            $token.show("fast");
            turn++;
            i = 0;
        }
    }
}

const clearBoard = (event) =>
{
    $('.token').remove();
}



$(() => {

    // Dynamic generate the column divs and populate them with an arrow and slots
    makeBoard();

    // Event handler to add tokens
    $('.column').on('click', placeToken);
    $('#clearBoard').on('click', clearBoard);


});
