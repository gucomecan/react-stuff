import { memo, useCallback, useState } from 'react';

const dataList = [
  { fName: 'gosho', lName: 'the keeper' },
  { fName: 'vancho', lName: 'the long' },
  { fName: 'pencho', lName: 'the other' },
  { fName: 'petio', lName: 'the sleepy' },
  { fName: 'totio', lName: 'the edge' },
  { fName: 'asparuh', lName: 'the old' },
  { fName: 'kotio', lName: 'the beauty' },
  { fName: 'temelko', lName: 'the ungly' },
];

const PlayerItem = memo(
  ({ info, onDelete }) => {
    console.log('item: ', info.fName);

    return (
      <div style={{ padding: 10, display: 'flex', width: 200, justifyContent: 'space-around' }}>
        <p>
          {info.fName} {info.lName}
        </p>
        <button onClick={() => onDelete(info.fName)}>Delete</button>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.info.fName === nextProps.info.fName
);

export const ListUpdateRerender = () => {  
  const [playersData, setPlayersData] = useState(dataList);

  const onDelete = useCallback((fName) => {
    setPlayersData((prev) => prev.filter((item) => item.fName !== fName));
  }, []);

  return (
    <>
      <p>List of best football players</p>
      {playersData.map((player) => (
        <PlayerItem key={player.fName} info={player} onDelete={onDelete} />
      ))}
    </>
  );
};
