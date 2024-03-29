import React, { useEffect, useState } from 'react'
import { useHubState } from '../hub-context'
import { db, doc, updateDoc, onSnapshot } from '../utils/firebase'

const Title = () => {
  const [DBVideo, setDBVideo] = useState(null)
  const {
    state: { editedVideo, previewVideoData, incompleteForm, formChecked, user },
    dispatch,
  } = useHubState()

  const handleUpdateData = async (key, val) => {
    if (!editedVideo) dispatch({ type: 'SET_PREVIEW', payload: { key, val } })
    else {
      const videoToUpdate = { ...DBVideo }
      videoToUpdate[key] = val
      const videoRef = doc(db, `hub/data/videos/${editedVideo}`)
      await updateDoc(videoRef, videoToUpdate)
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, `hub/data/videos/${editedVideo}`),
      (video) => setDBVideo(video.data()),
    )
    return unsub
  }, [editedVideo])

  return (
    <div
      className={`Title ${
        incompleteForm &&
        formChecked &&
        ((editedVideo && DBVideo.title === '') ||
          (!editedVideo && previewVideoData.title === ''))
          ? 'error'
          : ''
      }`}>
      <label htmlFor="title">Title *</label>
      <input
        id="title"
        type="text"
        value={editedVideo && DBVideo ? DBVideo.title : previewVideoData.title}
        onChange={(e) => handleUpdateData('title', e.target.value)}/>
    </div>
  )
}

export default Title
