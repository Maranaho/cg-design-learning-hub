import React, { useEffect, useState } from 'react'
import { db, doc, onSnapshot } from '../utils/firebase'
import linkIcn from '../assets/icons/link.svg'


const FrontLinks = ({videoID}) => {
  const [DBVideo, setDBVideo] = useState(null)

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, `hub/data/videos/${videoID}`),
      video => setDBVideo(video.data())
    )
    return unsub
  }, [videoID])

  if(!DBVideo)return <p>Loading...</p>
  const {links} = DBVideo
  return (
    <div className="FrontLinks">
      <h4>Links:</h4>
      <ul>
        {Object.keys(links).map(key=>(
          <li key={key}>
            <a
              target="_blank"
              rel="noreferrer"
              href={links[key].url}>{links[key].label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FrontLinks
