import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHubState } from '../hub-context';
import hifive from '../assets/images/hifive.svg';

const Success = ({ handleClose }) => {
  const {
    state: { newKey },
  } = useHubState();
  const [copySuccess, setCopySuccess] = useState(false);
  const copyRef = useRef(null);
  const handleCopy = () => {
    if (copyRef) {
      const copyURL = copyRef.current.value;
      navigator.clipboard
        .writeText(`www.design-hub.intuit.com/detail/${copyURL}`)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        });
    }
  };
  return (
    <div className="Success">
      <h1>Great job!</h1>
      <h2>Your video is published</h2>
      <img width="400" src={hifive} />
      <input ref={copyRef} type="hidden" value={newKey || ''} />
      <div className="linkss">
        <button
          onClick={handleCopy}
          className={`btn ghost mini ${copySuccess ? 'success' : ''}`}
        >
          {copySuccess ? 'Copied' : 'Copy'}
        </button>
        <Link className="link" to={`/detail/${newKey}`}>
          www.design-hub.intuit.com/detail/{newKey}
        </Link>
      </div>

      <div className="btnCtn">
        <button className="btn" onClick={handleCopy}>
          Share it!
        </button>
        <button className="btn ghost" onClick={() => handleClose(true)}>
          Close
        </button>
      </div>
    </div>
  );
};
export default Success;
