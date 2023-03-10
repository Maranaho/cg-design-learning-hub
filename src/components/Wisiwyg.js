import { useGalleryState } from '../context/gallery-context'
import { useEffect,useState } from 'react'
import { db,doc,updateDoc,onSnapshot } from '../utils/firebase'
import Draft from './Draft'

const Wisiwyg = ()=>{
  
  const { state:{ editedVideo, previewVideoData,user },dispatch } = useGalleryState()
  const [ DBVideo,setDBVideo ] = useState(null)
  const [ hideWiz,setHideWiz ] = useState(false)
  const readOnly = editedVideo && DBVideo && user.email !== DBVideo.uploader
  const contentToDB = async(richText) => {
    if(editedVideo) {
      const videoToUpdate = {...DBVideo}
      videoToUpdate.description = richText
      const videoRef = doc(db, `hub/data/videos/${editedVideo}`)
      await updateDoc(videoRef, videoToUpdate)
    }
    dispatch({type:"SET_PREVIEW",payload:{key:"description",val:richText}})
  }



  useEffect(()=>{
    const unsub = onSnapshot(doc(db, `hub/data/videos/${editedVideo}`), video => {
      setDBVideo(video.data()||previewVideoData)
    })
    return unsub
  },[editedVideo])

  useEffect(()=>{
    setHideWiz(true)
    setTimeout(()=>setHideWiz(false),1)
  },[editedVideo])


  
  return (
   <div className={`Wisiwyg ${readOnly ?"readOnly":""}`}>

      <label>Description</label>
      {DBVideo&&!hideWiz&&(
      <Draft
          readOnly={readOnly}
          contentToDB={contentToDB}
          DBVideo={DBVideo}/>
      )}
   </div>
  )
}

export default Wisiwyg