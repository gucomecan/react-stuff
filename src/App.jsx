import React from 'react';
import { ListUpdateRerender } from './ListUpdateRerender/ListUpdateRerender';
// import { TicTacToe } from './TicTacToe';

const App = () => {
  'use no memo';
  return (
    <>
      <React.StrictMode>
        Welcome: here we test capabilities of react and react compiler
        {/* game testing */}
        {/* <TicTacToe /> */}
        {/* test useEffect, useLayoutEffect */}
        {/* <SideEffects1 /> */}
        {/* test optimization of rendering list of items that change over time */}
        {/* <ListUpdateRerender /> */}
      </React.StrictMode>
    </>
  );
};

export default App;
