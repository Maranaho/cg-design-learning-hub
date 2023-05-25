import React, { useEffect, useState } from 'react';
import { useHubState } from '../hub-context';
import useAuth from '../hooks/useAuth';
import {
  // firestore
  db,
  doc,
  onSnapshot,
  collection,
  addDoc,
  Timestamp,

  // storage
  getStorage,
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} from '../utils/firebase';

const Publish = ({ handleClose }) => {
  const urls = {};
  const user = useAuth();
  const [DBVideo, setDBVideo] = useState(null);
  const [disable, setDisable] = useState(false);
  const {
    state: { editedVideo, previewVideoData },
    dispatch,
  } = useHubState();

  const handlePublish = () => {
    // deleteFile('recap.mov')
    //   return
    setDisable(true);
    if (!editedVideo && !previewVideoData.videoFile) {
      dispatch({ type: 'INCOMPLETE_FORM', payload: true });
      dispatch({ type: 'CHECK_FORM', payload: true });
      setTimeout(() => dispatch({ type: 'CHECK_FORM', payload: false }), 3000);
      return;
    }

    if (editedVideo && DBVideo) {
      confirmPublish();
    } else if (previewVideoData.videoFile) {
      const { videoFile, thumbnailFile } = previewVideoData;
      upload(videoFile);
    }
  };

  const upload = (file) => {
    const storage = getStorage();

    const storageRef = ref(storage, `hub/${file.name.split(' ').join('-')}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const handleProgress = (snap) => {
      const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
      if (progress > 0)
        dispatch({ type: 'PROGRESS', payload: Math.round(progress) });
    };

    const handleError = (err) => console.error(err);

    const handleSuccess = () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => urlToDB(url));
    };

    uploadTask.on('state_changed', handleProgress, handleError, handleSuccess);
  };

  const urlToDB = async (url) => {
    const videoData = { ...previewVideoData, ...urls };
    videoData.createdAt = Timestamp.now();
    videoData.uploader = user.email;
    videoData.url = url;

    delete videoData.thumbnailFile;
    delete videoData.videoFile;

    const newKey = await addDoc(collection(db, `hub/data/videos/`), videoData);
    dispatch({ type: 'NEWKEY', payload: newKey.id });
    confirmPublish();
  };

  const confirmPublish = () => {
    if (editedVideo) handleClose();

    setDisable(true);
    setTimeout(() => {
      dispatch({ type: 'PROGRESS', payload: 0 });
      if (!editedVideo) dispatch({ type: 'CONFIRM_PUBLISH', payload: true });
    }, 500);
  };

  const deleteFile = (fileName) => {
    const storage = getStorage();
    const reff = ref(storage, `hub/${fileName}`);
    deleteObject(reff);
  };

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, `hub/data/videos/${editedVideo}`),
      (video) => setDBVideo(video.data()),
    );
    return unsub;
  }, [editedVideo]);

  return (
    <div className="Publish">
      {editedVideo ? (
        <button
          // disabled={
          //   editedVideo && DBVideo ? user.email !== DBVideo.uploader : disable
          // }
          onClick={() => dispatch({ type: 'DELETE_VIDEO', payload: true })}
          className="btn ghost">
          Delete video
        </button>
      ) : (
        <div />
      )}
      <button
        // disabled={
        //   editedVideo && DBVideo ? user.email !== DBVideo.uploader : disable
        // }
        onClick={handlePublish}
        className="btn">
        {editedVideo ? 'All set' : 'Publish video'}
      </button>
    </div>
  );
};
export default Publish;
