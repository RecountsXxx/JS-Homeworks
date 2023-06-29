$(document).ready(function() {
    var currentPlayer = 'x';
    var gameOver = false;
    var tie = 0;
    $('.cell').click(function() {
        if (!gameOver && $(this).text() === '') {
            $(this).text(currentPlayer).addClass('player-' + currentPlayer);
            checkWin();
            currentPlayer = (currentPlayer === 'x') ? 'o' : 'x';
            tie++;

            if (!gameOver && currentPlayer === 'o') {
                setTimeout(()=>{
                    var availableCells = $('.cell').not('.player-x, .player-o');
                    var randomCell = availableCells.eq(Math.floor(Math.random() * availableCells.length));
                    randomCell.text(currentPlayer).addClass('player-' + currentPlayer);
                    checkWin();
                    currentPlayer = 'x';
                    tie++;
                },100);
            }
        }
    });

    function checkWin() {
        var cells = $('.cell');
        var combinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (var i = 0; i < combinations.length; i++) {
            var combo = combinations[i];
            if (
                cells.eq(combo[0]).text() === currentPlayer &&
                cells.eq(combo[1]).text() === currentPlayer &&
                cells.eq(combo[2]).text() === currentPlayer
            ) {
                gameOver = true;
                cells.eq(combo[0]).addClass('winner');
                cells.eq(combo[1]).addClass('winner');
                cells.eq(combo[2]).addClass('winner');
                if (currentPlayer === 'x') {
                    alert("User wins!");
                } else {
                    alert("Computer wins!");
                }
                restartGame();
                break;
            }
            if (tie >= 8) {
                alert("Tie");
                gameOver = true;
                restartGame();
                break;
            }
        }
    }

    function restartGame() {
        gameOver = false;
        tie = 0;
        currentPlayer = 'x';
        setTimeout(()=>{
            $('.cell').text('').removeClass('player-x player-o winner');
        },1000);
    }
});