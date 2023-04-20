import React, { useEffect, useState } from 'react'
import { useHubState } from '../hub-context'
import { db, doc, onSnapshot } from '../utils/firebase'

const Tag = ({ tagKey, cb }) => {
  const [DBVideo, setDBVideo] = useState(null)
  const {
    state: { editedVideo, user, tags },
  } = useHubState()
  const label = tags[tagKey].label

  const handleTagClick = () => {
    const isOwner =
      editedVideo && DBVideo
        ? user.email !== DBVideo.uploader || user.email.includes('guessan')
        : true
    if (cb && isOwner) cb(tagKey)
  };

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, `hub/data/videos/${editedVideo}`),
      video => setDBVideo(video.data())
    )
    return unsub
  }, [editedVideo])

  return (
    <article className="Tag" onClick={handleTagClick}>
      <span>#{label}</span>
    </article>
  )
}
export default Tag
