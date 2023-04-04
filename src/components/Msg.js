import React from 'react';

const Msg = ({ msg, status }) => (
  <div className={`Msg ${status}`}>
    <article>{msg}</article>
  </div>
);
export default Msg;
