import React from 'react'
import useVideo from '../hooks/useVideo'
import { useHistory } from 'react-router-dom'
import { useHubState } from '../hub-context'

const TagLinks = ({videoID}) => {
  const { state: { tags } } = useHubState()
  const DBVideo = useVideo(videoID)


  if(!DBVideo) return null
  const { tags:dbTags } = DBVideo

  return (
    <div className="TagLinks">
      {dbTags.map(tagKey=><button className="tag" key={tagKey}>{tags[tagKey]}</button>)}
    </div>
    )
}
export default TagLinks
