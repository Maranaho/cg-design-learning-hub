import React, { useState, useRef,useEffect } from 'react'
import useVideos from '../hooks/useVideos'
import viewIcn from '../assets/icons/view.svg'
import {
  db,
  doc,
  updateDoc
} from '../utils/firebase'

const Views = ({count,videoID}) => {
  const minTime = 5
  const videos = useVideos()
  const [duration, setDuration] = useState(0)
  const videoRef = useRef(null)

  const updateViews = async()=>{
    if(count){
      const dbVideoToUpdate = doc(db, `hub/data/videos/${videoID}`)
      await updateDoc(dbVideoToUpdate, { views: videos[videoID].views + 1 })
    }
  }


  useEffect(()=>{
    if(videos && count && duration > 0){
    const clear = setTimeout(updateViews,duration>0?(duration*1000)/minTime:60000)
    return ()=>clearTimeout(clear)
    }
  },[videos,duration,videoID])

  


  if (!videos) return null
  return (
    <div className="views">
      <img width="20" src={viewIcn} alt="views"/>
      <span>{videos[videoID].views}</span>
      <video
        onLoadedMetadata={e=>setDuration(e.target.duration)}
        muted ref={videoRef} src={videos[videoID].url}/>
    </div>
    )
}
export default Views
