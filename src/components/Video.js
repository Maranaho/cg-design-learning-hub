import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Views from './Views'
import likeIcn from '../assets/icons/helpful.svg'

import components16 from '../assets/images/thumbnails/components16.svg'
import figma_tips16 from '../assets/images/thumbnails/figma_tips16.svg'
import foundations24 from '../assets/images/thumbnails/foundations24.svg'
import getting_started28 from '../assets/images/thumbnails/getting_started28.svg'
import metrics23 from '../assets/images/thumbnails/metrics23.svg'
import motion_figma19 from '../assets/images/thumbnails/motion_figma19.svg'
import motion_how_to20 from '../assets/images/thumbnails/motion_how_to20.svg'
import motion_prep16 from '../assets/images/thumbnails/motion_prep16.svg'
import motion_tips_and_tricks21 from '../assets/images/thumbnails/motion_tips_and_tricks_21.svg'
import native16 from '../assets/images/thumbnails/native16.svg'
import platform_technology16 from '../assets/images/thumbnails/platform_technology16.svg'
import workflow16 from '../assets/images/thumbnails/workflow16.svg'
const categories = {
  components:components16,
  figma_tips:figma_tips16,
  foundations:foundations24,
  getting_started:getting_started28,
  metrics:metrics23,
  motion_figma:motion_figma19,
  motion_how_to:motion_how_to20,
  motion_prep:motion_prep16,
  motion_tips_and_tricks:motion_tips_and_tricks21,
  native:native16,
  platform_technology:platform_technology16,
  workflow:workflow16
}

const Video = ({ video }) => {
  const history = useHistory()
  const videoRef = useRef(null)
  const [duration, setDuration] = useState('00:00')
  const { thumbnail, title, helpful, url,videoID } = video
  const {thumbIdx,category} = thumbnail
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
        {category&&<div className="cover">
          <img src={categories[category.split(" ").join("_")]}/>
        </div>}
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
