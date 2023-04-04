import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useHubState } from '../hub-context';
import useUsers from '../hooks/useUsers';
import Tag from './Tag';
import viewIcn from '../assets/icons/view.svg';

const EditVideo = ({ DBVideo, dbTags }) => {
  const maxTags = 2;
  const { videoID } = DBVideo;
  const users = useUsers();
  const {
    state: { addVideo, editedVideo },
    dispatch,
  } = useHubState();
  const [showTags, setShowTags] = useState(null);
  const history = useHistory();
  const handleEdit = (e) => {
    if (
      e.target.classList.contains('showLess') ||
      e.target.classList.contains('showMore')
    )
      return;
    if (!addVideo) {
      dispatch({ type: 'EDIT_VIDEO', payload: videoID });
      history.push(`/edit/${videoID}`);
    } else dispatch({ type: 'ADD_VIDEO', payload: false });
  };

  const showMoreTags = (tagKey) => {
    if (showTags === tagKey) setShowTags(null);
    else setShowTags(tagKey);
  };

  if (!DBVideo || !users || !dbTags) return null;
  const { thumbnail, title, createdAt, tags, uploader, views } = DBVideo;
  const { photoURL, displayName, preferredName } = users[uploader];

  return (
    <tr
      className={`EditVideo ${videoID === editedVideo ? 'selected' : ''}`}
      onClick={handleEdit}
    >
      <td className="thumbs">
        <div className={`thumbnail idx${thumbnail}`} />
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
  );
};
export default EditVideo;
