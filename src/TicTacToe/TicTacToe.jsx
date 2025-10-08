import { useState } from 'react';
import Board from './Components/Board';
import './TicTacToe.css';

// TODO
// [x] base crossing winning line
// [ ] calc first player(random)
// [ ] history

const initCellsValues = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkForEnd = (allVals, nextVal, currI) => {
  const winningCombo = winningCombinations.find((winningCombo) => {
    const winningIndex = winningCombo.indexOf(currI);
    if (winningIndex < 0) return false;

    return winningCombo.filter((address) => allVals[address] === nextVal).length === 3;
  });

  return { winningCombo, winner: winningCombo ? nextVal : null };
};

const TicTacToe = () => {
  const [vals, setVals] = useState(initCellsValues);
  const [isCurrentTic, setIsCurrentTic] = useState(false);
  const [winner, setWinner] = useState();
  const [winCombo, setWinCombo] = useState(undefined);
  const [hasStarted, setHasStarted] = useState(false);

  const handleCellClick = (i) => {
    if (!hasStarted || winner || vals[i]) return;

    const nextMove = isCurrentTic ? 'X' : 'O';
    setIsCurrentTic((prev) => !prev);

    const newVals = [...vals];
    newVals[i] = nextMove;
    setVals(newVals);

    const { winningCombo, winner: gameWinner } = checkForEnd(newVals, nextMove, i);
    setWinCombo(winningCombo);
    setWinner(gameWinner);
  };

  const tie = !vals.includes(null) && !winner;
  const gameEnd = winner || tie;
  const showBtn = !hasStarted || gameEnd;
  const getWinnerTitle = () => {
    let title = '';
    if (tie) {
      title = 'No winner :/';
      return title;
    }

    if (winner) {
      title = `Winner is: ${winner}`;
    }

    return title;
  };

  const handleStart = () => {
    setHasStarted(true);
    setVals(initCellsValues);
    setWinCombo()
    setWinner();
  };

  return (
    <div className="container">
      <button onClick={handleStart} className={`start-btn ${showBtn ? '' : 'hidden'}`}>
        {gameEnd ? 'New game' : 'Start game'}
      </button>

      <p className={`winner-title ${gameEnd ? '' : 'hidden'}`}>{getWinnerTitle()}</p>
      <Board cellVals={vals} onCellClick={handleCellClick} winningCombo={winCombo} />
    </div>
  );
};

export default TicTacToe;
