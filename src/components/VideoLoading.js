import React from 'react';
import loadVid from '../assets/images/loadVid.svg';

const VideoLoading = () => {
  const nbOfVideos = Array.from(Array(11).keys());

  return (
    <div className="VideoLoading VideoList center">
      <h3>Loading...</h3>
      <section className="vList">
        {nbOfVideos.map((idx) => (
          <img src={loadVid} key={`load${idx}`} />
        ))}
      </section>
    </div>
  );
};

export default VideoLoading;
