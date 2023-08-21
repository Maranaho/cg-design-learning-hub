import React from 'react'
import { useLocation } from 'react-router-dom'
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
  const notArchived = (video) =>
    !Object.getOwnPropertyDescriptor(video, 'archived')
  const location = useLocation().pathname

  const limitLength = currentTag ? 100 : 3

  if (!videos || !Object.keys(videos).length) return <VideoLoading />
  const filterdVideos = Object.keys(videos).filter((videoKey) =>
    currentTag
      ? videos[videoKey].tags.includes(currentTag) &&
        notArchived(videos[videoKey])
      : notArchived(videos[videoKey]),
  )
  const craftVideo = craft => filterdVideos.filter(videoKey => videos[videoKey].craft === craft)
    
  return (
    <section className="VideoList center">
      {!filterdVideos.length && <NoMatch />}
      {location === '/' && filterdVideos.length > 0 && <h3>Most recent</h3>}
      {location === '/' && (
        <div className="vList">
          {filterdVideos
            .map((videoID) => <Video key={videoID} video={videos[videoID]} />)
            .slice(0, 3)}
        </div>
      )}
      {craftVideo('systems').length > 0 && (location.includes('systems') || location === '/')&& (
        <h3>Systems</h3>
      )}
      { (location.includes('systems') || location === '/') && (
        <div className="vList">
          {craftVideo('systems')
            .map((videoID) => <Video key={videoID} video={videos[videoID]} />)
            .slice(0, location === '/' ? limitLength : 100)}
        </div>
      )}
      {craftVideo('motion').length > 0 &&  (location.includes('motion') || location === '/') && (
        <h3>Motion</h3>
      )}
      { (location.includes('motion') || location === '/')  && (
        <div className="vList">
          {craftVideo('motion')
            .map((videoID) => <Video key={videoID} video={videos[videoID]} />)
            .slice(0, location === '/' ? limitLength : 100)}
        </div>
      )}
      {craftVideo('content').length > 0 &&  (location.includes('content') || location === '/')  && (
        <h3>Content</h3>
      )}
      { (location.includes('content') || location === '/')  && (
        <div className="vList">
          {craftVideo('content')
            .map((videoID) => <Video key={videoID} video={videos[videoID]} />)
            .slice(0, location === '/' ? limitLength : 100)}
        </div>
      )}
    </section>
  )
}
export default VideoList
