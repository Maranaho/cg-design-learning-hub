import { useState } from 'react'
import viewIcn from '../assets/icons/view.svg'
import { useHistory } from 'react-router-dom'
import { useHubState } from '../hub-context'
import useUsers from '../hooks/useUsers'
import moment from 'moment'
import Tag from './Tag'

import components16 from '../assets/images/thumbnails/components16.svg'
import figma_tips16 from '../assets/images/thumbnails/figma_tips16.svg'
import foundations24 from '../assets/images/thumbnails/foundations24.svg'
import getting_started28 from '../assets/images/thumbnails/getting_started28.svg'
import metrics23 from '../assets/images/thumbnails/metrics23.svg'
import motion_figma19 from '../assets/images/thumbnails/motion_figma19.svg'
import motion_how_to20 from '../assets/images/thumbnails/motion_how_to20.svg'
import motion_prep16 from '../assets/images/thumbnails/motion_prep16.svg'
import motion_tips_and_tricks21 from '../assets/images/thumbnails/motion_tips_and_tricks_21.svg'
import native16 from '../assets/images/thumbnails/native16.svg'
import platform_technology16 from '../assets/images/thumbnails/platform_technology16.svg'
import workflow16 from '../assets/images/thumbnails/workflow16.svg'

const thumbnailImg = {
  "components":components16,
  "figma tips":figma_tips16,
  "foundations":foundations24,
  "getting started":getting_started28,
  "metrics":metrics23,
  "motion figma":motion_figma19,
  "motion how to":motion_how_to20,
  "motion prep":motion_prep16,
  "motion tips and tricks":motion_tips_and_tricks21,
  "native":native16,
  "platform technology":platform_technology16,
  "workflow1":workflow16
}

const width = 80

const EditVideo = ({ DBVideo, dbTags }) => {
  const maxTags = 2
  const { videoID } = DBVideo
  const users = useUsers()
  const {
    state: { addVideo, editedVideo },
    dispatch,
  } = useHubState()
  const [showTags, setShowTags] = useState(null)
  const history = useHistory()
  const handleEdit = e => {
    if (
      e.target.classList.contains('showLess') ||
      e.target.classList.contains('showMore')
    )
      return
    if (!addVideo) {
      dispatch({ type: 'EDIT_VIDEO', payload: videoID })
      history.push(`/edit/${videoID}`)
    } else dispatch({ type: 'ADD_VIDEO', payload: false })
  }

  const showMoreTags = (tagKey) => {
    if (showTags === tagKey) setShowTags(null)
    else setShowTags(tagKey)
  }

  if (!DBVideo || !users || !dbTags) return null
  const { thumbnail, title, createdAt, tags, uploader, views } = DBVideo
  const { photoURL, displayName, preferredName } = users[uploader]
  const {thumbIdx,category} = thumbnail
  return (
    <tr
      className={`EditVideo ${videoID === editedVideo ? 'selected' : ''}`}
      onClick={handleEdit}>
      <td className="thumbs">
        <div className="thumbCtn"><img style={{ transform:`translateX(-${thumbIdx*width}px)` }} src={thumbnailImg[category]}/></div>
      </td>
      <td>
        <div className="edit">
          <h3>{title}</h3>
          <span className="ago">{moment(createdAt.toDate()).fromNow()}</span>
        </div>
      </td>
      <td>
        <div className="tags">
          {tags
            .slice(0, showTags === videoID ? tags.length : maxTags)
            .map((tagKey) => (
              <Tag key={tagKey} tagKey={tagKey} tags={dbTags} />
            ))}
          {tags.length > maxTags && (
            <button onClick={() => showMoreTags(videoID)}>
              {showTags === videoID ? (
                <span className="showLess">Show less</span>
              ) : (
                <span className="showMore">+ {tags.length - maxTags} more</span>
              )}
            </button>
          )}
        </div>
      </td>
      <td>
        <div className="views">
          <span>{views}</span>
          <img width="14" src={viewIcn} />
        </div>
      </td>
      <td>
        <div className="uploader">
          <span>{preferredName}</span>
          <div className="photoCtn">
            <img src={photoURL} alt={displayName} />
          </div>
        </div>
      </td>
    </tr>
  )
}
export default EditVideo
