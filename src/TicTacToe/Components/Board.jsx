import './Board.css'

const btnClasses = {
  'X': 'tic',
  'O': 'tac'
}

const Board = ({ cellVals, onCellClick }) => {
  return (
    <div className="row">
      {cellVals.map((cellVal, i) => {
        return <Board.Cell key={i} onClick={() => onCellClick(i)} val={cellVal}/>;
      })}
    </div>
  );
};

Board.Cell = ({ val, onClick }) => {
  return (
    <button onClick={onClick} className={`cell ${btnClasses[val]}`}>
      {val}
    </button>
  );
};

export default Board;
