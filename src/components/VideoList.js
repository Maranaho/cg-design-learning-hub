import React from 'react'
import useVideos from '../hooks/useVideos'
import VideoLoading from './VideoLoading'
import Video from './Video'
import NoMatch from './NoMatch'
import { useHubState } from '../hub-context'

const VideoList = () => {
  const {
    state: { currentTag },
  } = useHubState()
  const videos = useVideos()
  const notArchived = (video) => !video.hasOwnProperty('archived')

  if (!videos || !Object.keys(videos).length) return <VideoLoading />
  const filterdVideos = Object.keys(videos).filter((videoKey) =>
    currentTag
      ? videos[videoKey].tags.includes(currentTag) &&
        notArchived(videos[videoKey])
      : notArchived(videos[videoKey]),
  )
  const craftVideo = (craft) =>
    filterdVideos.filter((videoKey) => videos[videoKey].craft === craft)
  return (
    <section className="VideoList center">
      {!filterdVideos.length && <NoMatch />}
      {filterdVideos.length > 0 && <h3>Most recent</h3>}
      <div className="vList">
        {filterdVideos.map((videoID) => (
          <Video key={videoID} video={videos[videoID]} />
        ))}
      </div>
      {craftVideo('systems').length > 0 && <h3>Systems</h3>}
      <div className="vList">
        {craftVideo('systems').map((videoID) => (
          <Video key={videoID} video={videos[videoID]} />
        ))}
      </div>
      {craftVideo('motion').length > 0 && <h3>Motion</h3>}
      <div className="vList">
        {craftVideo('motion').map((videoID) => (
          <Video key={videoID} video={videos[videoID]} />
        ))}
      </div>
    </section>
  )
}
export default VideoList
