import React, { useEffect, useState } from 'react'
import { useHubState } from '../hub-context'
import { db, doc, updateDoc, onSnapshot } from '../utils/firebase'

const Featured = () => {
  const [DBVideo, setDBVideo] = useState(null)
  const { state: { editedVideo, user, previewVideoData },  dispatch } = useHubState()

  const disabled =
    editedVideo && DBVideo ? user.email !== DBVideo.uploader : false

  const handleUpdateData = async() => {
    if (!editedVideo) dispatch({ type: 'SET_PREVIEW', payload: { key: 'featured', val: !previewVideoData.featured } })
    else {
      const videoToUpdate = { ...DBVideo }
      if(!videoToUpdate.hasOwnProperty("featured")) videoToUpdate.featured = true
      else videoToUpdate.featured = !videoToUpdate.featured
      const videoRef = doc(db, `hub/data/videos/${editedVideo}`)
      await updateDoc(videoRef, videoToUpdate)
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, `hub/data/videos/${editedVideo}`),
      video => setDBVideo(video.data())
    )
    return unsub
  },[editedVideo])

  if(!DBVideo)return null
  return (
    <div className="Featured CraftChoice">
      {/* <label>Featured</label> */}
      <div>
        <input
          onChange={handleUpdateData}
          checked={
            DBVideo
              ? DBVideo.featured
              : previewVideoData.featured
          }
          id="featured"
          type="checkbox"
          name="craft"
          disabled={disabled}/>
        <label htmlFor="featured">Feature this video?</label>
      </div>
    </div>
  )
}

export default Featured
