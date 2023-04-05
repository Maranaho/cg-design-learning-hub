import React from 'react'
import { useParams } from 'react-router-dom'
import useVideo from '../hooks/useVideo'
import Loading from './Loading'
import TagLinks from './TagLinks'
import Description from './Description'
import viewIcn from '../assets/icons/view.svg'
import likeIcn from '../assets/icons/helpful.svg'
import link from '../assets/icons/link.svg'

const DetailContent = () => {
  const { videoID } = useParams()
  const DBVideo = useVideo(videoID)


  if (!DBVideo) return <Loading />
  const {title,url, views, helpful, notHelpful } = DBVideo
  return (
    <section className="DetailContent">
      <video src={url} controls autoPlay loop/>
      <div className="meta">
        <div>
          <h1>{title}</h1>
          <span>
            <img width="20" src={viewIcn} alt="views"/>
            <span>{views}</span>
          </span>
        </div>
        <div>
          <button>
            <span>Was this helpful?</span>
            <img src={likeIcn} alt="likes"/>
            <span>{helpful.length}</span>
            <img src={likeIcn} className="dislike" alt="dislikes"/>
            <span>{notHelpful.length}</span>
          </button>
          <button>
            <img src={link} alt="copy to clipboard" />
            <span>Copy link</span>
          </button>
        </div>
      </div>
      <TagLinks video={videoID}/>
      {DBVideo.hasOwnProperty("description")&&<Description des={DBVideo.description}/>}
    </section>
    )
}
export default DetailContent
