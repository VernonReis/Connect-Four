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
            $column.append($('<div>').addClass('slot'));
        }
        $gameBoard.append($column);
    }
}

const placeToken = (event) =>
{
    // This is our event handler for clicking on a column
    const $column = $(event.currentTarget);
    const $slots = $column.children('.slot');

    for (let i = ($slots.length - 1); i >= 0; i--)
    {
        if (!$slots.eq(i).hasClass('red') && !$slots.eq(i).hasClass('black'))
        {
            
            $slots.eq(i).addClass(colors[turn%2]);
            turn++;
            i = 0;
        }
    }
}


$(() => {

    // Dynamic generate the column divs and populate them with an arrow and slots
    makeBoard();

    $('.column').on('click', placeToken);

});
