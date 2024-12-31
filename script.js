// Get DOM elements
const board = document.querySelector('.board');
const clearButton = document.getElementById('clearButton');
const newGridButton = document.getElementById('newGridButton');
const setSizeButton = document.getElementById('setSizeButton');
const sizeInput = document.querySelector('.input-container input');


// Create grid function (you already have this)
function createGrid(size) {
    board.innerHTML = '';
    const squareSize = 600 / size;
    
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        // Add mouse event listeners to change color
        square.addEventListener('mousedown', () => {
            square.style.backgroundColor = 'black'; // Change color on mouse down
        });

        square.addEventListener('mouseover', (e) => {
            if (e.buttons === 1) { // Check if the left mouse button is pressed
                square.style.backgroundColor = 'black'; // Change color while dragging
            }
        });
        board.appendChild(square);
    }
}

// Function to handle grid size changes
function updateGridSize() {
    const newSize = parseInt(sizeInput.value);
    
    // Validate input
    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Please enter a valid number between 1 and 100');
        return;
    }
    
    createGrid(newSize);
}

// Event listeners
setSizeButton.addEventListener('click', updateGridSize);

// Optional: Update grid when Enter key is pressed in input
sizeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        updateGridSize();
    }
});

// Function to clear the grid - lazy and I just call the updateGridSize function
function clearGrid() {
    updateGridSize();
}

// Event listener for clear button
clearButton.addEventListener('click', clearGrid);

// Initialize with default 16x16 grid
createGrid(16);