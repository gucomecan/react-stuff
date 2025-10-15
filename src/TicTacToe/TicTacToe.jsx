import { useState } from 'react';

import Board from './Components/Board';
import './TicTacToe.css';

// untils and initial values
const initCellsState = Array(9).fill(null);

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

const initialWinnerState = { winCombo: null, player: null };
// NOTE: items -> {[..., {address: number, player: O | X}] , activeIndex: number}
const initialHistoryState = { items: [], activeIndex: null };

const checkForEnd = (allVals, lastPlayer, address) => {
  const winningCombo = winningCombinations.find((winningCombo) => {
    const winningIndex = winningCombo.indexOf(address);
    if (winningIndex < 0) return false;

    return winningCombo.filter((address) => allVals[address] === lastPlayer).length === 3;
  });

  return { winningCombo, winnerPlayer: winningCombo ? lastPlayer : null };
};

// [/1,2,3/ /4,5,6/ /7,8,9/] => coordinates(x,y) related to indexes that are scaled up by 1 for easies calculation
const getTurnCoordinates = (index) => {
  const scaledArrIndex = index + 1;
  const x = Math.ceil(scaledArrIndex / 3);
  // default value assume number can be devided by 3
  let y = 3;

  const leftover = scaledArrIndex % 3;
  if ([1, 2].includes(leftover)) {
    y = leftover;
  }

  return { x, y };
};

const playersArr = ['X', 'O'];
const isFirstPlayerTic = () => {
  const valIndex = Math.round(Math.random());

  return playersArr[0] === playersArr[valIndex];
};

const TicTacToe = () => {
  const [vals, setVals] = useState(initCellsState);
  const [isCurrentTic, setIsCurrentTic] = useState(() => isFirstPlayerTic());
  const [winner, setWinner] = useState(initialWinnerState);
  const [hasStarted, setHasStarted] = useState(false);

  const [history, setHistory] = useState(initialHistoryState);

  const nextPlayer = isCurrentTic ? 'X' : 'O';
  const tie = !vals.includes(null) && !winner.player;
  const gameEnd = winner.player || tie;
  const showBtn = !hasStarted || gameEnd;

  const handleCellClick = (i) => {
    if (!hasStarted || winner.player || vals[i]) return;

    setIsCurrentTic((prev) => !prev);
    setHistory((prev) => {
      const historyItems = prev.items?.slice(0, history.activeIndex + 1);

      return {
        items: [...historyItems, { player: nextPlayer, address: i }],
        activeIndex: historyItems.length,
      };
    });

    const newVals = [...vals];
    newVals[i] = nextPlayer;
    setVals(newVals);

    const { winningCombo, winnerPlayer } = checkForEnd(newVals, nextPlayer, i);
    setWinner({ winCombo: winningCombo, player: winnerPlayer });
  };

  const getTitle = () => {
    let title = `Next player: ${nextPlayer}`;

    if (tie) {
      title = 'No winner :/';
      return title;
    }

    if (winner.player) {
      title = `Winner is: ${winner.player}`;
    }

    return title;
  };

  const handleStart = () => {
    setHasStarted(true);
    setVals(initCellsState);
    setWinner(initialWinnerState);
    setHistory(initialHistoryState);
  };

  const handleBackInTime = (stepToGo) => {
    const targetHistory = history?.items.slice(0, stepToGo + 1);
    const newVals = [...initCellsState];
    targetHistory.forEach((historyItem) => {
      newVals[historyItem.address] = historyItem.player;
      setIsCurrentTic(!(historyItem.player === 'X'));
    });

    const lastHistoryItem = targetHistory.at(-1);
    const { winningCombo, winnerPlayer } = checkForEnd(newVals, lastHistoryItem.player, lastHistoryItem.address);

    setVals(newVals);
    setWinner({ winCombo: winningCombo, player: winnerPlayer });
    setHistory((prev) => ({ ...prev, activeIndex: stepToGo }));
  };

  return (
    <div>
      <div className="main-container">
        <button onClick={handleStart} className={`start-btn ${showBtn ? '' : 'hidden'}`}>
          {gameEnd ? 'New game' : 'Start game'}
        </button>

        <p className={'title'}>{getTitle()}</p>
        <Board cellVals={vals} onCellClick={handleCellClick} winningCombo={winner.winCombo} />
      </div>
      {history?.items.map((historyItem, i) => {
        const { x, y } = getTurnCoordinates(historyItem.address);
        return (
          <p key={i} className="history-item">
            Player: {historyItem.player} on position x: {x}, y: {y}
            <button onClick={() => handleBackInTime(i)} className={history.activeIndex === i ? 'active' : ''}>
              Go here
            </button>
          </p>
        );
      })}
    </div>
  );
};

export default TicTacToe;
