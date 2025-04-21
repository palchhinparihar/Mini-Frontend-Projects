// Array of the possible winning combinations (rows, columns, diagonals)
let winnningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Row wins
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Column wins
    [0, 4, 8], [2, 4, 6],             // Diagonal wins
];

// Player X starts the game
let playerTurn = "X";
let playerTurnArray = [];  // Tracks moves

let player = document.querySelector("#player-turn");
let container = document.querySelector(".container");
let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-btn");

function main() {
    // Show the initial player turn message
    player.innerHTML = `Player ${playerTurn}'s turn`;
    
    // Handle box click events
    boxes.forEach(box => {
        box.addEventListener("click", () => {
            // If box is empty, mark it with the current player's turn
            if (box.innerHTML === "") {
                box.innerHTML = playerTurn;
                playerTurnArray.push(playerTurn);

                resetButton.style.visibility = 'visible';  // Show reset button

                // Check for winner after each move
                if (checkWinner()) {
                    player.innerHTML = `Player ${playerTurn} is the winner!`;
                    disableMoves();  // Disable further moves after winning
                    return;
                }

                // Switch players
                playerTurn = playerTurn === "X" ? "O" : "X";
                player.innerHTML = `Player ${playerTurn}'s turn`;

                // Check for draw if all boxes are filled
                if (playerTurnArray.length === 9) {
                    player.innerHTML = "It's a draw!";
                    container.classList.add("draw");  // Add draw class for draw
                    disableMoves();  // Disable further moves
                }
            }
        });
    });

    // Reset button functionality
    resetButton.addEventListener("click", () => {
        boxes.forEach(box => {
            box.innerHTML = '';  // Clear box content
            box.style.backgroundColor = '';  // Reset background color
            player.innerHTML = "";  // Clear player turn message
        });
        
        playerTurnArray = [];  // Reset moves array
        playerTurn = "X";  // Reset starting player
        player.innerHTML = `Player ${playerTurn}'s turn`;

        resetButton.style.visibility = 'hidden';  // Hide reset button
        container.classList.remove("draw");  // Remove draw class

        enableMoves();  // Re-enable moves
    });
}

// Function to check for a winner
function checkWinner() {
    for (combination of winnningCombinations) {
        const [a, b, c] = combination;
        const boxA = document.querySelectorAll(".box")[a];
        const boxB = document.querySelectorAll(".box")[b];
        const boxC = document.querySelectorAll(".box")[c];

        // If all three boxes in a combination are the same, highlight them as winner
        if (boxA.innerHTML && boxA.innerHTML === boxB.innerHTML && boxB.innerHTML === boxC.innerHTML) {
            boxA.style.backgroundColor = '#69d069';  // Green background for winning combination
            boxB.style.backgroundColor = '#69d069';
            boxC.style.backgroundColor = '#69d069';
            return true;
        }
    }
    return false;  // No winner
}

// Disable all moves (disable click events)
function disableMoves() {
    boxes.forEach(box => {
        box.style.pointerEvents = 'none';  // Prevent further clicks
    });
}

// Re-enable all moves (enable click events)
function enableMoves() {
    boxes.forEach(box => {
        box.style.pointerEvents = '';  // Allow clicks again
    });
}

main();
