// Select important elements from the HTML document that we'll need to work with
const board = document.querySelector('.board');
const clearButton = document.getElementById('clearButton');
const setSizeButton = document.getElementById('setSizeButton');
const sizeInput = document.querySelector('.input-container input');
const colorOptions = document.querySelectorAll('.color-option');
let currentColor = 'black'; // Tracks which color is currently selected


// Creates a grid of squares that we can draw on
// The size parameter determines how many squares per side (size x size total squares)
function createGrid(size) {
    board.innerHTML = ''; // Clear any existing squares
    const squareSize = 600 / size; // Calculate size of each square (board is 600px wide)
    
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        
        // Color square when mouse is first pressed down
        square.addEventListener('mousedown', () => {
            square.style.backgroundColor = getCurrentColor();
        });

        // Color square when mouse moves over it while pressed (for continuous drawing)
        square.addEventListener('mouseover', (e) => {
            if (e.buttons === 1) { // 1 means left mouse button is pressed
                square.style.backgroundColor = getCurrentColor();
            }
        });
        board.appendChild(square);
    }
}

// Validates and updates the grid size when user inputs a new size
function updateGridSize() {
    const newSize = parseInt(sizeInput.value);
    
    // Make sure the input is a valid number between 1 and 100
    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Please enter a valid number between 1 and 100');
        return;
    }
    
    createGrid(newSize);
}

// Event listener for the "Set Size" button
setSizeButton.addEventListener('click', updateGridSize);

// Allow user to press Enter key in the size input field instead of clicking button
sizeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        updateGridSize();
    }
});

// Resets the grid to a clean state with a cascading animation
function clearGrid() {
    const squares = Array.from(board.children);
    const size = Math.sqrt(squares.length);
    
    // Add transition to all squares immediately
    squares.forEach(square => {
        square.style.transition = 'background-color 0.15s ease-out';
    });
    
    // Calculate delay for each square based on its position
    squares.forEach((square, index) => {
        const row = Math.floor(index / size);
        const col = index % size;
        // Create a wave-like effect by using the distance from top-left corner
        const distance = Math.sqrt(row * row + col * col);
        const delay = distance * 15; // Much faster delay (15ms multiplier)
        
        setTimeout(() => {
            square.style.backgroundColor = 'white';
            // Add a brief flash effect
            square.style.boxShadow = '0 0 2px rgba(255,255,255,0.8)';
            setTimeout(() => {
                square.style.boxShadow = 'none';
            }, 150);
        }, delay);
    });
}

// Event listener for the "Clear" button
clearButton.addEventListener('click', clearGrid);

// Set up color selection functionality
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Visual feedback: show which color is selected
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        // Update the current drawing color
        currentColor = option.dataset.color;
    });
});

// Returns the color to use for drawing
// If 'random' is selected, generates a random RGB color
// Otherwise returns the selected color name
function getCurrentColor() {
    if (currentColor === 'random') {
        return `rgb(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256})`;
    }
    return currentColor;
}

// Start the application with a default 16x16 grid
createGrid(16);