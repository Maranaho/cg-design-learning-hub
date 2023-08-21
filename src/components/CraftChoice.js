import React, { useEffect, useState } from 'react'
import { useHubState } from '../hub-context'
import { db, doc, updateDoc, onSnapshot } from '../utils/firebase'

const CraftChoice = () => {
  const [DBVideo, setDBVideo] = useState(null)
  const {
    state: { editedVideo, previewVideoData },
    dispatch
  } = useHubState()

  const disabled = false

  const handleUpdateData = async craft => {
    if (!editedVideo)
      dispatch({ type: 'SET_PREVIEW', payload: { key: 'craft', val: craft } })
    else {
      const videoToUpdate = { ...DBVideo }
      videoToUpdate.craft = craft
      const videoRef = doc(db, `hub/data/videos/${editedVideo}`)
      await updateDoc(videoRef, videoToUpdate)
    }
  }

  useEffect(()=> {
    const unsub = onSnapshot(
      doc(db, `hub/data/videos/${editedVideo}`),
      video => setDBVideo(video.data())
    )
    return unsub
  }, [editedVideo])

  return (
    <div className="CraftChoice">
      <label>Craft</label>
      <div>
        <input
          onChange={()=> handleUpdateData('systems')}
          checked={
            DBVideo
              ? DBVideo.craft === 'systems'
              : previewVideoData.craft === 'systems'
          }
          id="systems"
          type="checkbox"
          name="craft"
          disabled={disabled}
        />
        <label htmlFor="systems">Systems</label>
      </div>
      <div>
        <input
          onChange={() => handleUpdateData('motion')}
          checked={
            DBVideo
              ? DBVideo.craft === 'motion'
              : previewVideoData.craft === 'motion'
          }
          id="motion"
          type="checkbox"
          name="craft"
          disabled={disabled} />
        <label htmlFor="motion">Motion</label>
      </div>
      <div>
        <input
          onChange={() => handleUpdateData('content')}
          checked={
            DBVideo
              ? DBVideo.craft === 'content'
              : previewVideoData.craft === 'content'
          }
          id="content"
          type="checkbox"
          name="craft"
          disabled={disabled}
        />
        <label htmlFor="content">Content</label>
      </div>
    </div>
  )
}

export default CraftChoice
