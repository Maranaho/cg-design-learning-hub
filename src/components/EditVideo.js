import { useGalleryState } from '../context/gallery-context'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import useUsers from '../hooks/useUsers'
import Tag from './Tag'
import viewIcn from '../assets/icons/view.svg'



const EditVideo = ({DBVideo,dbTags})=>{
  const videoID = DBVideo.videoID
  const users = useUsers()
  const { state:{ addVideo,editedVideo },dispatch } = useGalleryState()
  const navigate = useNavigate()
  const handleEdit = () => {
    if(!addVideo){
      dispatch({type:"EDIT_VIDEO",payload:videoID})
      navigate(`/edit/${videoID}`)
    } else dispatch({type:"ADD_VIDEO",payload:false})
  }

  if(!DBVideo || !users || !dbTags) return null
  const { thumbnail,title ,createdAt,tags,uploader,views } = DBVideo
  const {photoURL,displayName,preferredName} = users[uploader]
  
  return (
    <tr
      className={`EditVideo ${videoID === editedVideo ? "selected":""}`}
      onClick={handleEdit}>
      <td className="thumb">
        <div>
          <div>
            {thumbnail&&<img src={thumbnail}/>}
          </div>
        </div>
      </td>
      <td>
        <div className="edit">
          <h3>{title}</h3>
          <span className="ago">{moment(createdAt.toDate()).fromNow()}</span>
        </div>
      </td>
      <td>
        <div className="views">
          <span>{views}</span>
          <img width="14" src={viewIcn}/>
        </div>
        {/* <div className="tags">
        {tags.slice(0,3).map(tagKey=>(
            <Tag
              key={tagKey}
              tagKey={tagKey}
              tags={dbTags}/>
          ))}
          {tags.length > 3&&<span>+ {tags.length - 3} more</span>}
        </div> */}
      </td>
      <td>
        <div className="uploader">
          <span>{preferredName}</span>
          <div className="photoCtn"><img src={photoURL} alt={displayName}/></div>
        </div>
      </td>
    </tr>
  )
}
export default EditVideo