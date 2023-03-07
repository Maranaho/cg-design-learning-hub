import close from '../assets/icons/close.svg'
import { useState,useEffect } from 'react'
import { useGalleryState } from '../context/gallery-context'
import { useNavigate } from 'react-router-dom'
import Wisiwyg from './Wisiwyg'
import VideoUploader from './VideoUploader'
import AddTags from './AddTags'
import Publish from './Publish'
import Title from './Title'
import Msg from './Msg'


const AddEdit = ()=>{
  
  const [ show,setShow ] = useState("")
  const { state:{ editedVideo,formChecked, incompleteForm, wrongFormat },dispatch } = useGalleryState()
  const navigate = useNavigate()
  const reallyClosing = ()=>{
    if(!editedVideo) {
      dispatch({type:"ADD_VIDEO",payload:false})
      dispatch({type:"RESET_DEFAULT_VIDEO"})
    } else {
      dispatch({type:"EDIT_VIDEO",payload:null})
      navigate('/admin')
    }
  }
  const handleClose = ()=>{
    setShow("")
    setTimeout(reallyClosing,400)
  }

  useEffect(()=>setShow("show"),[])


  return (
   <div className={`AddEdit ${show}`}>
    {incompleteForm && formChecked && <Msg status="error" msg="Nope, you need at least a title a video and a thumbnail"/>}
    {wrongFormat && <Msg status="error" msg="Wrong file type, thumbnail should be an image and video should be a video."/>}
    <section>
      <button
        className="close"
        onClick={handleClose}>
          <img src={close} alt="close"/>
      </button>
      <div className="videoNTags">
        <Title/>
        <AddTags/>
      </div>
      <VideoUploader/>
      <Wisiwyg/>
      <Publish handleClose={handleClose}/>
    </section>
   </div>
  )
}

export default AddEdit