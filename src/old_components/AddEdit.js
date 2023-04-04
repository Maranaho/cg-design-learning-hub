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
import Progress from './Progress'
import Success from './Success'


const AddEdit = ()=>{
  
  const [ show,setShow ] = useState("")
  const { state:{ editedVideo,formChecked, incompleteForm, wrongFormat,stateProgress,publishConfirmed },dispatch } = useGalleryState()
  const navigate = useNavigate()
  const reallyClosing = ()=>{
    if(!editedVideo) {
      dispatch({type:"ADD_VIDEO",payload:false})
      dispatch({type:"NEWKEY",payload:null})
      dispatch({type:"RESET_DEFAULT_VIDEO"})
    } else {
      dispatch({type:"EDIT_VIDEO",payload:null})
      navigate('/admin')
    }
  }
  const handleClose = published =>{
    setShow("")
    setTimeout(()=>{
      reallyClosing()
      if(published)dispatch({type:"CONFIRM_PUBLISH",payload:false})
    },400)
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
      {publishConfirmed && <Success  handleClose={handleClose}/>}
      {stateProgress > 0 && !publishConfirmed&&<Progress handleClose={handleClose}/>}
      <div className={`uploadForm ${stateProgress > 0 || publishConfirmed? "loading":""}`}>
        <div className="videoNTags">
          <Title/>
          <AddTags/>
        </div>
        <VideoUploader/>
        <Wisiwyg/>
        <Publish handleClose={handleClose}/>
      </div>
    </section>
   </div>
  )
}

export default AddEdit