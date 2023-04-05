import React from 'react'
import useVideos from '../hooks/useVideos'
import Video from './Video'
import NoMatch from './NoMatch'
import { useHubState } from '../hub-context'

const RelatedVideos = () => {
  const {
    state: { currentTag },
  } = useHubState()
  const videos = useVideos()
  const notArchived = (video) => !video.hasOwnProperty('archived')

  if (!videos || !Object.keys(videos).length) return null
  const filterdVideos = Object.keys(videos).filter((videoKey) =>
    currentTag
      ? videos[videoKey].tags.includes(currentTag) &&
        notArchived(videos[videoKey])
      : notArchived(videos[videoKey]),
  )
  const craftVideo = (craft) =>
    filterdVideos.filter((videoKey) => videos[videoKey].craft === craft)
  return (
    <section className="RelatedVideos">
      {!filterdVideos.length && <NoMatch />}
      {filterdVideos.length > 0 && <h3>Most recent</h3>}
      <div>
        {filterdVideos.map((videoID) => (
          <Video key={videoID} video={videos[videoID]} />
        ))}
      </div>
    </section>
  )
}
export default RelatedVideos
