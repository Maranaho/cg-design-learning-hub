import React, { useEffect, useState } from 'react'
import { useHubState } from '../hub-context'
import { db, doc, updateDoc, onSnapshot } from '../utils/firebase'
import LinkEditor from "./LinkEditor"
import AddLink from "./AddLink"

const Links = () => {
  const [DBVideo, setDBVideo] = useState(null)
  const {
    state: { editedVideo, previewVideoData },
    dispatch,
  } = useHubState()

  const handleUpdateData = async (key, link) => {
    const {label,url} = link
    if (!editedVideo){
        let tmpVid = {...previewVideoData}
        tmpVid.links[key] = {label,url}
        dispatch({ type: 'SET_PREVIEW', payload: { key:"links", val:tmpVid } })
    }
    else {
      const videoToUpdate = { ...DBVideo }
      videoToUpdate.links[key] = {label,url}
      const videoRef = doc(db, `hub/data/videos/${editedVideo}`)
      await updateDoc(videoRef, videoToUpdate)
    }
  }

  const handleRemoveLink = async key => {
      if (!editedVideo){
          let tmpVid = {...previewVideoData}
          delete tmpVid.links[key]
          dispatch({ type: 'SET_PREVIEW', payload: { key:"links", val:tmpVid } })
        }
        else {
      const videoToUpdate = { ...DBVideo }
      delete videoToUpdate.links[key]
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
  }, [editedVideo])

  if(!DBVideo)return <p>Loading...</p>
  return (
    <div
      className="Links">
      <div className="linkCtn">
        {Object.keys(DBVideo.links).map(key=>(
            <LinkEditor
                handleRemoveLink={handleRemoveLink}
                handleUpdateData={handleUpdateData}
                key={key}
                linkKey={key}
                link={DBVideo.links[key]}/>
        ))}
      </div>
      <AddLink handleUpdateData={handleUpdateData}/>
    </div>
  )
}

export default Links