import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import viewIcn from '../assets/icons/view.svg';
import likeIcn from '../assets/icons/helpful.svg';

const Video = ({ video }) => {
  const history = useHistory();
  const videoRef = useRef(null);
  const [duration, setDuration] = useState('');
  const { thumbnail, views, createdAt, title, helpful, url } = video;
  const width = window.innerWidth;

  const handleVideoLoaded = () => {
    let s = Math.floor(videoRef.current.duration);
    let m = Math.floor(s / 60);
    m = m >= 10 ? m : `0${m}`;
    s = Math.floor(s % 60);
    s = s >= 10 ? s : `0${s}`;
    setDuration(`${m}:${s}`);
    videoRef.current.playbackRate = 10;
  };

  return (
    <article className="Video">
      <span className="duration">{duration}</span>
      <div className={`thumbnail idx${thumbnail}`}>
        <video
          onMouseEnter={(e) => (e.target.currentTime = 0)}
          muted
          loop
          autoPlay
          ref={videoRef}
          src={url}
          onLoadedMetadata={handleVideoLoaded}
        />
      </div>

      <div className="meta">
        <h4>{title}</h4>
        <div>
          <span>
            <img width="20" src={viewIcn} />
            <span>{views}</span>
          </span>
          <span className="helpful">
            <img width="18" src={likeIcn} />
            <span>{helpful.length}</span>
          </span>
        </div>
      </div>
      <span className="ago">{moment(createdAt.toDate()).fromNow()}</span>
    </article>
  );
};
export default Video;
