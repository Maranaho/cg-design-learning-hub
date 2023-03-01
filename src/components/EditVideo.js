import { useGalleryState } from '../context/gallery-context'
import { useEffect,useState } from 'react'
import { db,doc,onSnapshot } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'



const EditVideo = ({videoID})=>{
  const [ DBVideo,setDBVideo ] = useState(null)
  const { dispatch } = useGalleryState()
  const navigate = useNavigate()
  const handleEdit = () => {
    dispatch({type:"EDIT_VIDEO",payload:videoID})
    navigate(`/edit/${videoID}`)
  }

  useEffect(()=>{

    const unsub = onSnapshot(doc(db, `hub/data/videos/${videoID}`), video => {
      setDBVideo(video.data())
    })

    return unsub

  },[])

  if(!DBVideo) return null
  return (
    <article onClick={handleEdit} className="EditVideo">
     {DBVideo.title}
    </article>
  )
}
export default EditVideo