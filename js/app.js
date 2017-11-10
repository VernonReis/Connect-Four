


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
        console.log("wubalubadubdub");
        $gameBoard.append($column);
    }
}


$(() => {

    // Dynamic generate the column divs and populate them with an arrow and slots
    makeBoard();


});
