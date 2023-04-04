import React, { useState, useEffect } from 'react';
import { useHubState } from '../hub-context';
import { db, doc, updateDoc, onSnapshot } from '../utils/firebase';

const PickThumb = ({ handleClose }) => {
  const {
    state: { editedVideo, previewVideoData },
    dispatch,
  } = useHubState();
  const [DBVideo, setDBVideo] = useState(null);

  const handleThumChange = async (thumb) => {
    if (editedVideo) {
      if (DBVideo) {
        const videoToUpdate = { ...DBVideo };
        videoToUpdate.thumbnail = thumb;
        const videoRef = doc(db, `hub/data/videos/${editedVideo}`);
        await updateDoc(videoRef, videoToUpdate);
      }
    } else {
      dispatch({
        type: 'SET_PREVIEW',
        payload: {
          key: 'thumbnail',
          val: thumb,
        },
      });
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, `hub/data/videos/${editedVideo}`),
      (video) => setDBVideo(video.data()),
    );
    return unsub;
  }, [editedVideo]);

  return (
    <section className="PickThumb">
      <div>
        <h3>Pick a thumbnail:</h3>
        <div
          onClick={(e) =>
            handleThumChange(Number(e.target.getAttribute('idx')))
          }
        >
          {Array.from(Array(11).keys()).map((idx) => (
            <article
              className={`thumb idx${idx} ${
                editedVideo && DBVideo && DBVideo.thumbnail === idx
                  ? 'selected'
                  : !editedVideo && previewVideoData.thumbnail === idx
                  ? 'selected'
                  : ''
              }`}
              idx={idx}
              key={`option${idx}`}
            />
          ))}
        </div>
      </div>
      <div className="btnCtn">
        <button onClick={handleClose} className="btn">
          <span>Continue</span>
        </button>
      </div>
    </section>
  );
};
export default PickThumb;
