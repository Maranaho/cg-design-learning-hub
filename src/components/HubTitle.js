import React from 'react';
import { useLocation } from 'react-router-dom';

const HubTitle = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];

  return (
    <header className="HubTitle">
      <section className="center">
        {path === 'motion' ? (
          <Motion />
        ) : path === 'systems' ? (
          <Systems />
        ) : (
          <Home />
        )}
      </section>
    </header>
  );
};

const Home = () => (
  <h1>
    <span>Welcome</span>
    <span>to the</span>
    <span>Learning Hub</span>
  </h1>
);
const Motion = () => (
  <h1>
    <span>Motion</span>
  </h1>
);
const Systems = () => (
  <h1>
    <span>Systems</span>
  </h1>
);

export default HubTitle;