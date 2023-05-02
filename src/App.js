import React, {useState} from 'react';
import {calculateSolution} from './utils/solver';
import './App.css';

const START_GRID = [
  [4, 0, 5, 7, 0, 0, 0, 0, 6],
  [0, 0, 0, 0, 0, 2, 0, 9, 0],
  [8, 9, 0, 0, 0, 0, 0, 3, 7],
  [1, 3, 4, 8, 9, 0, 6, 7, 0],
  [9, 6, 0, 2, 7, 4, 5, 1, 0],
  [0, 0, 0, 0, 0, 3, 8, 4, 0],
  [3, 0, 9, 0, 2, 6, 0, 0, 0],
  [0, 5, 0, 0, 0, 0, 0, 0, 4],
  [0, 0, 0, 9, 5, 0, 0, 6, 0],
];

function SudokuSolver() {
  const [grid, setGrid] = useState(START_GRID);

  const handleInputChange = (index, row, e) => {
    const newGrid = [...grid];
    newGrid[row][index] = parseInt(e.target.value);
    setGrid(newGrid);
  };

  const solveSudoku = async () => {
    const newGrid = await calculateSolution(grid);
    setGrid(newGrid);
  }

  const generateSudokuRow = (row, rowIndex) => {
    return (
      <div key={`row-${rowIndex}`} className='sudoku-row'>
        {row.map((cell, index) => generateSudokuInput(cell, index, rowIndex))}
      </div>
    );
  }

  const generateSudokuInput = (cell, index, row) => {
    return (
      <input
        type='text'
        className='sudoku-input'
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
      </div>
    </div>
  );
}

export default SudokuSolver;
