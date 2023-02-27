import useVideos from '../hooks/useVideos'
import Loading from './Loading'
import { useGalleryState } from '../context/gallery-context'
import { useNavigate } from 'react-router-dom'


const Admin = ()=>{
  
  const videos = useVideos()
  const { dispatch } = useGalleryState()
  const navigate = useNavigate()
  const handleEdit = videoID => {
    dispatch({type:"EDIT_VIDEO",payload:videoID})
    navigate(`/edit/${videoID}`)
  }



  if(!videos||!Object.keys(videos).length)return <Loading/>
  return (
    <section className="Admin">
      <button onClick={()=>dispatch({type:"ADD_VIDEO",payload:true})}>Add video</button>
      <nav>
        <ul>
          {Object.keys(videos).map(videoID=>(
            <li key={videoID} onClick={()=>handleEdit(videoID)}>
              {videos[videoID].title}
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
export default Admin