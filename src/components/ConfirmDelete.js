import React, { useState, useEffect } from 'react';
import { useHubState } from '../hub-context';
import { db, doc, updateDoc, onSnapshot } from '../utils/firebase';

const ConfirmDelete = () => {
  const {
    state: { editedVideo },
    dispatch,
  } = useHubState();
  const [DBVideo, setDBVideo] = useState(null);
  const [wait, setWait] = useState(false);
  const [done, setDone] = useState(false);

  const archiveVideo = async () => {
    if (DBVideo) {
      const videoToUpdate = { ...DBVideo };
      videoToUpdate.archived = true;
      const videoRef = doc(db, `hub/data/videos/${editedVideo}`);
      setWait(true);
      await updateDoc(videoRef, videoToUpdate);
      setTimeout(() => {
        setDone(true);
        dispatch({ type: 'HIDE_VIDEO', payload: editedVideo });
      }, 1200);
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, `hub/data/videos/${editedVideo}`),
      (video) => setDBVideo(video.data()),
    );
    return unsub;
  }, [editedVideo]);

  if (!DBVideo) return null;
  if (done)
    return (
      <section className="ConfirmDelete">
        <h3>Done!</h3>
        <p>
          <strong>{DBVideo.title}</strong> is gone!
        </p>
        <div>
          <button
            onClick={() => {
              dispatch({ type: 'DELETED_VIDEO', payload: editedVideo });
            }}
            className="btn ghost"
          >
            Close
          </button>
        </div>
      </section>
    );
  return (
    <section className="ConfirmDelete">
      <h3>Are you sure?</h3>
      <p>
        You are about to delete <strong>{DBVideo.title}</strong> ok?
      </p>
      <div>
        <button
          onClick={archiveVideo}
          className={`btn noBorder ${wait ? 'wait' : ''}`}
        >
          Do it!
        </button>
      </div>
    </section>
  );
};
export default ConfirmDelete;
