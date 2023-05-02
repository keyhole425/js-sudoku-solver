/*
  brute force-y recursion
  Basically goes through every (empty) cell and tries each valid value, continuing
  on solving the rest of the puzzle for each valid option until all cells are filled out.
  If unable to finish solving, backtrack to last known success state and try again until completed
  or fails to complete (bad initial state)
*/
function calculateSolution(grid) {
  const newGrid = [...grid];

  processGrid(newGrid, 0);
  
  return newGrid;
}

function processGrid(grid, index) {
  let rowNum = Math.floor(index / 9);
  let colNum = index % 9;
  // Skip any filled cells
  while (index < 81 && grid[rowNum][colNum]) {
    index += 1;
    rowNum = Math.floor(index / 9);
    colNum = index % 9;
  }
  if (index === 81) return true;

  // Get list of valid numbers for current cell & recursively call for each one
  const moves = calculateMovesForCell(grid, rowNum, colNum);
  for (let i = 0; i < moves.length; i++) {
    grid[rowNum][colNum] = moves[i];
    if (processGrid(grid, index)) {
      return true;
    }
  }
  // No valid numbers available
  grid[rowNum][colNum] = 0;
  return false;
}

function calculateMovesForCell(grid, rowNum, colNum) {
  const moves = [];
  for (let num = 1; num <= 9; num++) {
    if (isValidOption(grid, rowNum, colNum, num)) {
      moves.push(num);
    }
  }
  return moves;
}

function isValidOption(grid, rowNum, colNum, optionToCheck) {
  // Check if in row
  if (grid[rowNum].includes(optionToCheck)) return false;
  // Check if in column
  for (let i = 0; i < 9; i++) {
    if (grid[i][colNum] === optionToCheck) return false;
  }
  // Check if in 3x3 square
  const rowStart = Math.floor(rowNum / 3) * 3;
  const colStart = Math.floor(colNum / 3) * 3;
  for (let rowCheck = rowStart; rowCheck < rowStart + 3; rowCheck++) {
    const row = grid[rowCheck];
    for (let colCheck = colStart; colCheck < colStart + 3; colCheck++) {
      if (row[colCheck] === optionToCheck) return false;
    }
  }
  return true;
}

export {calculateSolution};