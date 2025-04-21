document.addEventListener("DOMContentLoaded", () => {
    let canClick = true, points = 0, count = 0, moves = 0;
    let startBtn = document.querySelector(".start-btn");
    let restartBtn = document.querySelector(".restart-btn");

    function main() {
        // Event listener for selecting grid size
        document.querySelectorAll('.grid-choices').forEach(choice => {
            choice.addEventListener('click', function() {
                let gridSize = this.textContent.trim().split(" x ");
                let rowSize = parseInt(gridSize[0]), colSize = parseInt(gridSize[1]);

                startBtn.style.visibility = "visible";

                // ✅ Prevent multiple event listeners
                startBtn.replaceWith(startBtn.cloneNode(true));
                startBtn = document.querySelector(".start-btn");

                startBtn.addEventListener('click', () => {
                    scrollToSection(document.getElementById("play-game"));
                    playGame(rowSize, colSize);
                });
            });
        });
    }

    // Scrolls to a specified section
    function scrollToSection(element) {
        element.scrollIntoView({ behavior: 'auto', block: 'center' });
    }

    // Initializes the game grid and starts the game
    function playGame(row, col) {
        let gridContainer = document.querySelector(".game-container");

        gridContainer.style.gridTemplateRows = `repeat(${row}, 1fr)`;
        gridContainer.style.gridTemplateColumns = `repeat(${col}, 1fr)`;

        let shuffledImages = getImages(row, col);
        let cellArray = [];

        // Creating the grid cells
        for (let i = 0; i < row * col; i++) {
            cellArray.push(`
                <div class="cell w-full rounded-xl object-fill cursor-pointer transition-all duration-300 hover:scale-105 relative transform-style-preserve-3d">
                    <img class="image rounded-xl h-[200px] w-full" src="${shuffledImages[i]}" />
                    <div class="cover bg-black absolute bottom-0 h-[200px] w-full rounded-xl text-8xl font-bold text-white flex justify-center items-center">?</div>
                </div>
            `);
        }

        shuffleArray(cellArray);
        gridContainer.innerHTML = cellArray.join('');

        let cells = document.querySelectorAll(".cell");
        let selectedCells = [];

        // Adding event listeners to each cell
        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                if (!canClick || selectedCells.length === 2 || selectedCells.includes(cell) || cell.classList.contains("matched")) {
                    return;
                }

                let image = cell.querySelector(".image");
                let cover = cell.querySelector(".cover");

                selectedCells.push(cell);

                cover.style.visibility = "hidden";
                image.style.visibility = "visible";
                cell.style.transform = "rotateY(180deg)";

                if (selectedCells.length === 2) {
                    canClick = false;
                    checkMatch(selectedCells, cells);
                }
            });
        });
    }

    // Checks if two selected cells match
    function checkMatch(selectedCells, cells) {
        let matches = document.querySelector(".matches");
        let setPoints = document.querySelector(".points");
        let setMoves = document.querySelector(".moves");
        let addPoints = document.querySelector(".addpoints");

        [firstCell, secondCell] = [...selectedCells];

        let firstImg = firstCell.children[0].src.split('img/')[1];
        let secondImg = secondCell.children[0].src.split('img/')[1];

        if (firstImg === secondImg) {
            points += 10;

            matches.innerText = `🎉 Match Found! 🎉`;
            addPoints.innerText = `+10 Points`;
            setPoints.innerText = `Points: ${points}`;

            firstCell.classList.add("matched");
            secondCell.classList.add("matched");

            setTimeout(() => {
                matches.innerText = "";
                addPoints.innerText = "";
                canClick = true;
            }, 1000);

            count++;
        } else {
            setTimeout(() => {
                firstCell.style.transform = secondCell.style.transform = "rotateY(0deg)";

                firstCell.querySelector(".cover").style.visibility = "visible";
                firstCell.querySelector(".image").style.visibility = "hidden";

                secondCell.querySelector(".cover").style.visibility = "visible";
                secondCell.querySelector(".image").style.visibility = "hidden";

                canClick = true;
            }, 800);
        }

        moves += 2;
        setMoves.innerText = `Moves: ${moves}`;
        selectedCells.length = 0;

        // Checking if all matches are found
        if (count === (cells.length) / 2) {
            matches.innerText = `✨ All Matches Found! ✨`;
            cells.forEach(c => c.style.pointerEvents = "none");

            setTimeout(() => {
                matches.innerText = "";
                restartBtn.style.visibility = "visible";
            }, 1000);

            // ✅ Prevent multiple event listeners on restart button
            restartBtn.replaceWith(restartBtn.cloneNode(true));
            restartBtn = document.querySelector(".restart-btn");

            restartBtn.addEventListener("click", () => {
                points = 0, count = 0, moves = 0;
                setPoints.innerText = setMoves.innerText = "";
                
                startBtn.style.visibility = restartBtn.style.visibility = "hidden";
                
                document.querySelector(".game-container").innerHTML = "";

                scrollToSection(document.querySelector(".header"));

                // ✅ Reinitialize the game selection after reset
                main();
            });
        }
    }

    // Retrieves shuffled images for the game grid
    function getImages(row, col) {
        const images = [];
        for (let i = 1; i <= 9; i++) {
            images.push(`img/${i}.jpg`);
        }

        shuffleArray(images);

        let totalPairs = (row * col) / 2;
        let selectedImages = images.slice(0, totalPairs);
        let imagePairs = [...selectedImages, ...selectedImages];

        shuffleArray(imagePairs);
        return imagePairs;
    }

    // Shuffles an array using the Fisher-Yates algorithm
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    main();
});
