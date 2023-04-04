import React, { useRef, useEffect, useState } from 'react';
import { useHubState } from '../hub-context';
import back from '../assets/images/dog/back.svg';
import front from '../assets/images/dog/front.svg';
import bird1 from '../assets/images/dog/bird1.svg';
import bird2 from '../assets/images/dog/bird2.svg';
import sun from '../assets/images/dog/sun.svg';
import cloud from '../assets/images/dog/cloud.svg';
import weiner from '../assets/images/weiner.svg';

const Dog = () => {
  const cutoff = 1;
  const {
    state: { stateProgress },
  } = useHubState();
  const dogRef = useRef(null);
  const [width, setWidth] = useState(0);
  const getLeft = (left, strength) =>
    (((width - 100) * stateProgress) / 100) * strength - left;
  useEffect(() => {
    if (dogRef) {
      setWidth(dogRef.current.getBoundingClientRect().width);
    }
  }, [dogRef]);
  if (!dogRef) return <img className="weiner" src={weiner} />;
  return (
    <div className="Dog" ref={dogRef}>
      <img
        style={{ transform: `translateX(${`${getLeft(78, 0.8)}px)`}` }}
        className="bird2"
        src={bird1}
      />
      <img
        style={{ transform: `translateX(${`${getLeft(76, 0.7)}px)`}` }}
        className="bird1"
        src={bird2}
      />
      <img
        style={{ transform: `translateX(${`${getLeft(20, 0.2)}px)`}` }}
        className="sun"
        src={sun}
      />
      <img
        style={{ transform: `translateX(${`${getLeft(120, 0.8)}px)`}` }}
        className="cloud"
        src={cloud}
      />
      <div style={{ width: `${getLeft(0, 0.97) + 4}px` }} className="long" />
      <img
        style={{ transform: `translateX(${`${getLeft(76, 0.97)}px)`}` }}
        className="dogFront"
        src={front}
      />
      {stateProgress >= cutoff && <img className="dogBack" src={back} />}
    </div>
  );
};
export default Dog;
