import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const SideEffects1 = () => {
  const test1 = useRef(false);
  const [data1, setData1] = useState(1);
  console.log('LOG BEFORE ALL', data1);

  useLayoutEffect(() => {
    console.log('LAYOUT EFFECT', data1);
  }, [data1]);

  useEffect(() => {
    console.log('EFFECT', data1);
    setData1((prev) => prev + 1);
    console.log('ref val:', test1.current);
    if (test1.current) {
      return;
    }
    console.log('ref val after check', test1.current);
    return () => {
      test1.current = true;
    };
  }, []);

  return <div>Mega test {console.log('in the HTML: ', data1)}</div>;
};
