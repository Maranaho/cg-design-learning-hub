import useVideos from '../hooks/useVideos'
import Loading from './Loading'
import { useGalleryState } from '../context/gallery-context'
import AddEdit from './AddEdit'
import EditVideo from './EditVideo'



const Admin = ()=>{
  const videos = useVideos()
  const { state: { addVideo,editedVideo},dispatch } = useGalleryState()

  if(!videos||!Object.keys(videos).length)return <Loading/>
  return (
    <section className="Admin">
      <button onClick={()=>dispatch({type:"ADD_VIDEO",payload:true})}>Add video</button>
      <nav>
        {Object.keys(videos).map(videoID=><EditVideo key={videoID} videoID={videoID} />)}
      </nav>
      {(addVideo || editedVideo) && <AddEdit/>}
    </section>
  )
}
export default Admin
//7O9bEmL0KGtieiMrLRsK