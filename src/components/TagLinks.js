import React from 'react'
import useVideo from '../hooks/useVideo'
import { useHistory } from 'react-router-dom'
import { useHubState } from '../hub-context'

const TagLinks = ({videoID}) => {
  const { state: { tags },dispatch } = useHubState()
  const DBVideo = useVideo(videoID)
  const history = useHistory()
  const handleTagClick = key =>{
    dispatch({type:"CURRENT_TAG",payload:key})
    history.push("/")
  }
  if(!DBVideo) return null
  const { tags:dbTags } = DBVideo

  return (
    <div className="TagLinks">
      {dbTags.map(tagKey=>(
        <button
          onClick={()=>handleTagClick(tagKey)}
          className="tag"
          key={tagKey}>{tags[tagKey]}</button>
      ))}
    </div>
    )
}
export default TagLinks
