import React, { useEffect,useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import useVideos from '../hooks/useVideos'
import Loading from './Loading'
import TagLinks from './TagLinks'
import Helpful from './Helpful'
import Description from './Description'
import Views from './Views'
import FrontLinks from './FrontLinks'
import link from '../assets/icons/link.svg'
import { useHubState } from '../hub-context'

const DetailContent = () => {
  const copyRef = useRef(null)
  const { state: { finalURL } } = useHubState()
  const { videoID } = useParams()
  const [DBVideo,setDBVideo] = useState(null)
  const videos = useVideos()
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

  useEffect(()=>{
    if(videos)setDBVideo(videos[videoID])
  },[videos])


  if (!DBVideo) return <Loading />
  const {title,url} = DBVideo
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

      {Object.keys(DBVideo.links).length > 0 &&<FrontLinks videoID={videoID}/>}
    </section>
    )
}
export default DetailContent
