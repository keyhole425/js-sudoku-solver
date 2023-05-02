import React, {useState} from 'react';
import {calculateSolution} from './utils/solver';
import './App.css';

// Testing State
const START_GRID = [
  [0, 2, 0, 1, 9, 0, 0, 0, 0],
  [4, 0, 3, 0, 0, 7, 8, 9, 0],
  [0, 0, 0, 0, 4, 0, 3, 6, 0],
  [0, 0, 0, 9, 0, 0, 0, 5, 4],
  [3, 0, 0, 0, 0, 0, 0, 0, 8],
  [5, 8, 0, 0, 0, 1, 0, 0, 0],
  [0, 6, 5, 0, 1, 0, 0, 0, 0],
  [0, 9, 2, 3, 0, 0, 6, 0, 5],
  [0, 0, 0, 0, 7, 5, 0, 8, 0]
];

// Start State
const EMPTY_GRID = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function SudokuSolver() {
  const [grid, setGrid] = useState(JSON.parse(JSON.stringify(START_GRID)));

  const handleInputChange = (index, row, e) => {
    const newGrid = [...grid];
    const newValue = parseInt(e.target.value || 0);
    
    if (newValue >= 0 && newValue <= 9) {
      newGrid[row][index] = newValue;
      setGrid(newGrid);
    }
  };

  const solveSudoku = async () => {
    const newGrid = await calculateSolution(grid);
    setGrid(newGrid);
  }

  const resetSudoku = () => {
    setGrid(JSON.parse(JSON.stringify(START_GRID)));
  }

  const generateSudokuRow = (row, rowIndex) => {
    return (
      <div key={`row-${rowIndex}`} className='sudoku-row'>
        {row.map((cell, index) => generateSudokuInput(cell, index, rowIndex))}
      </div>
    );
  }

  const generateSudokuInput = (cell, index, row) => {
    let cssClasses = 'sudoku-input';
    const colSquareNum = Math.floor(index / 3);
    const rowSquareNum = Math.floor(row / 3);

    // 1st & 3rd row of squares
    if (rowSquareNum === 0 || rowSquareNum === 2) {
      if (colSquareNum === 0 || colSquareNum === 2) {
        cssClasses += ' light-bg';
      }
    }
    else {
      if (colSquareNum === 1) {
        cssClasses += ' light-bg';
      }
    }
    return (
      <input
        type='text'
        className={cssClasses}
        value={cell === 0 ? '' : cell}
        onChange={(e) => handleInputChange(index, row, e)}
        key={`${row}-${index}`}
      />
    );
  }

  const generateButtonBar = () => {
    return (
      <div className='button-bar'>
        <h2>How To Use</h2>
        <p>
          Set up the sudoku puzzle that is to be solved by entering numbers directly into the grid to the left. 
        </p>
        <p>
          Once you are happy, click the "Solve" button below to see the solution.
        </p>
        <br/>
        <h2>Actions</h2>
        <button onClick={solveSudoku} className='solve-button'>Solve</button>
        <button onClick={resetSudoku} className='solve-button'>Reset</button>
      </div>
    );
  }

  return (
    <div className='app'>
      <div className='sudoku-container'>
        <h2>Sudoku Solver</h2>
        {grid.map((row, index) => generateSudokuRow(row, index))}
      </div>
      {generateButtonBar()}
    </div>
  );
}

export default SudokuSolver;
