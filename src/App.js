import React, {useState} from 'react';
import {calculateSolution} from './utils/solver';
import './App.css';

// Testing State
const START_GRID = [
  [4, 0, 5, 7, 0, 0, 0, 0, 6],
  [0, 0, 0, 0, 0, 2, 0, 9, 0],
  [8, 9, 0, 0, 0, 0, 0, 3, 7],
  [1, 3, 4, 8, 9, 0, 6, 7, 0],
  [9, 6, 0, 2, 7, 4, 5, 1, 0],
  [0, 0, 0, 0, 0, 3, 8, 4, 0],
  [3, 0, 9, 0, 2, 6, 0, 0, 0],
  [0, 5, 0, 0, 0, 0, 0, 0, 4],
  [0, 0, 0, 9, 5, 0, 0, 6, 0]
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
    newGrid[row][index] = parseInt(e.target.value || 0);
    setGrid(newGrid);
  };

  const solveSudoku = async () => {
    const newGrid = await calculateSolution(grid);
    setGrid(newGrid);
  }

  const resetSudoku = () => {
    console.log('reset to start grid:', START_GRID);
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

  return (
    <div className='app'>
      <div className='sudoku-container'>
        <h2>Sudoku Solver</h2>
        {grid.map((row, index) => generateSudokuRow(row, index))}
      </div>
      <div className='button-bar'>
        <h4>How To Use</h4>
        <p>
          Add the digits directly into the squares to the left.
          <br/><br/>
          Once you are happy, click the "Solve" button below to see the solution.
        </p>
        <button onClick={solveSudoku} className='solve-button'>Solve</button>
        <button onClick={resetSudoku} className='solve-button'>Reset</button>
      </div>
    </div>
  );
}

export default SudokuSolver;
