import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Views from './Views'
import likeIcn from '../assets/icons/helpful.svg'


const Video = ({ video }) => {
  const history = useHistory()
  const videoRef = useRef(null)
  const [duration, setDuration] = useState('00:00')
  const { thumbnail, title, helpful, url,videoID } = video
  const handleVideoLoaded = () => {
    let s = Math.floor(videoRef.current.duration)
    let m = Math.floor(s / 60)
    m = m >= 10 ? m : `0${m}`
    s = Math.floor(s % 60)
    s = s >= 10 ? s : `0${s}`
    setDuration(`${m}:${s}`)
    videoRef.current.playbackRate = 10
  }

  return (
    <article className="Video" onClick={()=>history.push(`/detail/${videoID}`)}>
      <span className="duration">{duration}</span>
      <div className="thumbnail">
        <div className="cover">
          <img src={thumbnail}/>
        </div>
        <video
          onMouseEnter={e => e.target.currentTime = 0}
          muted loop autoPlay
          ref={videoRef}
          src={url}
          onLoadedMetadata={handleVideoLoaded}/>
      </div>

      <div className="meta">
        <h4>{title}</h4>
        <div>
          <Views videoID={videoID}/>
          <span className="helpful">
            <img width="18" src={likeIcn} />
            <span>{helpful.length}</span>
          </span>
        </div>
      </div>
    </article>
  )
}
export default Video
