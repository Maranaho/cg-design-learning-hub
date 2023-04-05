import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import useVideo from '../hooks/useVideo'
import Loading from './Loading'
import TagLinks from './TagLinks'
import Description from './Description'
import viewIcn from '../assets/icons/view.svg'
import likeIcn from '../assets/icons/helpful.svg'
import link from '../assets/icons/link.svg'
import { useHubState } from '../hub-context'

const DetailContent = () => {
  const copyRef = useRef(null)
  const { state: { finalURL } } = useHubState()
  const { videoID } = useParams()
  const DBVideo = useVideo(videoID)
  const [copySuccess, setCopySuccess] = useState(false)
  const handleCopy = () => {
      if (copyRef) {
        const copyURL = copyRef.current.value
        navigator.clipboard
          .writeText(finalURL + copyURL)
          .then(() => {
            setCopySuccess(true)
            setTimeout(() => setCopySuccess(false), 2000)
          })
      }
    }
  


  if (!DBVideo) return <Loading />
  const {title,url, views, helpful, notHelpful } = DBVideo
  return (
    <section className="DetailContent">
      <video src={url} controls autoPlay loop/>
      <div className="meta">
        <div>
          <h1>{title}</h1>
          <span className="views">
            <img width="20" src={viewIcn} alt="views"/>
            <span>{views}</span>
          </span>
        </div>
        <div>
          <div className="btnCtn">
            <button className="btn">
              <span>Was this helpful?</span>
              <img src={likeIcn} alt="likes"/>
              <span>{helpful.length}</span>
              <img src={likeIcn} className="dislike" alt="dislikes"/>
              <span>{notHelpful.length}</span>
            </button>
            <button onClick={handleCopy} className={`btn copy ${copySuccess?"copied":""}`}>
              {!copySuccess&&<img src={link} alt="copy to clipboard" />}
              <span>{copySuccess?"Copied":"Copy link"}</span>
            </button>
          </div>
        </div>
      </div>
      <TagLinks videoID={videoID}/>
      {DBVideo.hasOwnProperty("description")&&<Description des={DBVideo.description}/>}
      <input ref={copyRef} type="hidden" value={videoID} />
    </section>
    )
}
export default DetailContent
