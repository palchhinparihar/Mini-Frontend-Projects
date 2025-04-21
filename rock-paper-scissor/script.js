// Select DOM elements
let gameChoices = document.querySelectorAll(".game");
let userSelectedChoice = document.querySelector(".user-choice");
let computerSelectedChoice = document.querySelector(".computer-choice");
let userScoreElement = document.querySelector(".user-score");
let computerScoreElement = document.querySelector(".computer-score");
let resultMessage = document.querySelector(".win-player");
let userScore = 0, computerScore = 0;

// Main function to set up event listeners and game logic
function main() {
    // Loop through each game choice and add event listener
    gameChoices.forEach(gameChoice => {
        let gameChoiceButton = gameChoice.querySelector(".game-btn");

        gameChoiceButton.addEventListener("click", () => {
            gameChoiceButton.style.backgroundColor = "#9a9edc";
            // Reset button color after 0.7s
            removeColor(gameChoiceButton);  

            // Update user and computer's choices
            let userPref = gameChoice.querySelector(".choice-name").textContent;
            userSelectedChoice.textContent = userPref;
            let computerPref = getComputerChoice();
            computerSelectedChoice.textContent = computerPref;

            // Determine and display the winner
            checkWinner(userPref, computerPref);

            // Visible the reset button
            resetButton.style.visibility = "visible";
        });
    });

    // Reset button functionality
    let resetButton = document.querySelector("#reset-btn");
    resetButton.addEventListener("click", () => {
        // Reset user and computer's choices
        userSelectedChoice.textContent = "";
        computerSelectedChoice.textContent = "";

        // Reset scores
        userScore = 0, computerScore = 0;  
        // Update score display
        userScoreElement.textContent = `Score: ${userScore}`;
        computerScoreElement.textContent = `Score: ${computerScore}`;
        
        // Clear result message
        resultMessage.textContent = ''; 

        resetButton.style.visibility = "hidden";
    });
}

// Function to reset background color after 0.7s
function removeColor(choiceButton) {
    setTimeout(() => {
        choiceButton.style.backgroundColor = "";
    }, 700);
}

// Function to get a random computer choice
function getComputerChoice() {
    const computerChoices = ["Rock", "Paper", "Scissor"];
    let randomNum = Math.floor(Math.random() * 3);
    return computerChoices[randomNum];
}

// Function to check the winner and update the scores
function checkWinner(userPref, computerPref) {
    // Clear previous message
    resultMessage.textContent = ''; 

    // Determine the winner
    if (
        (userPref === 'Rock' && computerPref === 'Paper') || 
        (userPref === 'Paper' && computerPref === 'Scissor') ||
        (userPref === 'Scissor' && computerPref === 'Rock')
    ) {
        resultMessage.textContent = "Computer Won!";
        resultMessage.style.color = "#9e0303";  // Red for computer win
        computerScore++;
    }
    else if (
        (userPref === 'Rock' && computerPref === 'Scissor') || 
        (userPref === 'Paper' && computerPref === 'Rock') ||
        (userPref === 'Scissor' && computerPref === 'Paper')
    ) {
        resultMessage.textContent = "User Won!";
        resultMessage.style.color = "#007a1c";  // Green for user win
        userScore++;
    }
    else {
        resultMessage.textContent = "It's a tie!";
        resultMessage.style.color = "white";  // Tie message in white
    }

    // Update the score display
    computerScoreElement.textContent = `Score: ${computerScore}`;
    userScoreElement.textContent = `Score: ${userScore}`;
}

// Initialize the game
main();
