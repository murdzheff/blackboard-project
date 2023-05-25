// Get the canvas element and its 2D context
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Set the initial canvas dimensions
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Variable to track whether the mouse is being pressed
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Get the color picker and line width control elements
const colorPicker = document.getElementById('colorPicker');
const lineWidthControl = document.getElementById('lineWidthControl');

// Set up event listeners for mouse actions
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Function to start drawing
function startDrawing(event) {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  lastX = event.clientX - rect.left;
  lastY = event.clientY - rect.top;
}

// Function to draw on the canvas
function draw(event) {
  if (!isDrawing) return; // Exit if the mouse is not being pressed

  const rect = canvas.getBoundingClientRect();
  const currentX = event.clientX - rect.left;
  const currentY = event.clientY - rect.top;

  drawSmoothLine(lastX, lastY, currentX, currentY);
  lastX = currentX;
  lastY = currentY;
}

// Function to draw a smooth line using Bézier curves
function drawSmoothLine(startX, startY, endX, endY) {
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);

  // Calculate control points for Bézier curve
  const cp1x = (startX + endX) / 2;
  const cp1y = (startY + endY) / 2;
  const cp2x = (startX + endX) / 2;
  const cp2y = (startY + endY) / 2;

  context.strokeStyle = colorPicker.value;
  context.lineWidth = lineWidthControl.value;
  context.lineCap = 'round';
  context.lineJoin = 'round';

  context.quadraticCurveTo(cp1x, cp1y, endX, endY);
  context.stroke();
}

// Function to stop drawing
function stopDrawing() {
  isDrawing = false;
}

// Clear the canvas when the "Clear" button is clicked
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath(); // Reset the drawing state
});

// Update canvas dimensions when the window is resized
window.addEventListener('resize', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});
