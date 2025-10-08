import './Board.css'

const btnClasses = {
  'X': 'tic',
  'O': 'tac'
}

const crossingTypesClasses = ['win-horizontal', 'win-vertical', 'win-diagonal-right', 'win-diagonal-left'];

const calcCrossingLineClass = (winningCombo, currentIndex) => {
  if(!winningCombo || (winningCombo.length && !winningCombo.includes(currentIndex))) return ''

  if (winningCombo[0] + 1 === winningCombo[1]) {
    // horizontal line
    return crossingTypesClasses[0];
  }

  if (winningCombo[0] + 3 === winningCombo[1]) {
    // vertical line
    return crossingTypesClasses[1];
  }

  if (winningCombo[0] + 4 === winningCombo[1]) {
    // right diagonal
    return crossingTypesClasses[2];
  }

  if (winningCombo[0] + 2 === winningCombo[1]) {
    // left diagonal
    return crossingTypesClasses[3];
  }
};

const Board = ({ cellVals, onCellClick, winningCombo }) => {
  return (
    <div className="row">
      {cellVals.map((cellVal, i) => {
        return <Board.Cell key={i} onClick={() => onCellClick(i)} val={cellVal} className={calcCrossingLineClass(winningCombo, i)}/>;
      })}
    </div>
  );
};

Board.Cell = ({ val, onClick, className }) => {
  return (
    <button onClick={onClick} className={`cell ${btnClasses[val]} ${className}`}>
      {val}
    </button>
  );
};

export default Board;
