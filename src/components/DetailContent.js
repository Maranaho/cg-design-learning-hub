import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import useVideo from '../hooks/useVideo'
import Loading from './Loading'
import TagLinks from './TagLinks'
import Helpful from './Helpful'
import Description from './Description'
import Views from './Views'
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
          <Views count videoID={videoID}/>
        </div>
        <div>
          <div className="btnCtn">
            <Helpful/>
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
