import close from '../assets/icons/close.svg'
import { useGalleryState } from '../context/gallery-context'
import { useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { db,doc,updateDoc,onSnapshot } from '../utils/firebase'
import Wisiwyg from './Wisiwyg'


const AddEdit = ()=>{
  
  const [ DBVideo,setDBVideo ] = useState(null)
  const { state:{ editedVideo, previewVideoData },dispatch } = useGalleryState()
  const navigate = useNavigate()
  const handleClose = ()=>{
    
    if(!editedVideo) {
      dispatch({type:"ADD_VIDEO",payload:false})
      dispatch({type:"RESET_DEFAULT_VIDEO"})
    } else {
      dispatch({type:"EDIT_VIDEO",payload:null})
      navigate('/admin')
    }
  }

  const handleUpdateData = async(key,val) => {
    if(!editedVideo) dispatch({type:"SET_PREVIEW",payload:{key,val}})
    else {
      const videoToUpdate = {...DBVideo}
      videoToUpdate[key] = val
      const videoRef = doc(db, `hub/data/videos/${editedVideo}`)
      await updateDoc(videoRef, videoToUpdate)
    }
  }

  useEffect(()=>{

    const unsub = onSnapshot(doc(db, `hub/data/videos/${editedVideo}`), video => {
      setDBVideo(video.data())
    })

    return unsub

  },[])


  return (
   <div className="AddEdit">
    <section>
      <button
        className="close"
        onClick={handleClose}>
          <img src={close} alt="close"/>
      </button>

    
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={editedVideo&&DBVideo?DBVideo.title:previewVideoData.title}
          onChange={e=>handleUpdateData("title",e.target.value)}/>
      </div>

      <Wisiwyg/>
    

    </section>
   </div>
  )
}

export default AddEdit