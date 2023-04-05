import React from 'react'
import useVideo from '../hooks/useVideo'
import { useHistory } from 'react-router-dom';

const TagLinks = ({videoID}) => {
  const DBVideo = useVideo(videoID)


  if(!DBVideo) return null
  const {tags } = DBVideo

  return (
    <div className="TagLinks">
   TagLinks
    </div>
    )
}
export default TagLinks
