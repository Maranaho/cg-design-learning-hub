import { useGalleryState } from '../context/gallery-context'
import { useEffect,useState } from 'react'
import { db,doc,updateDoc,onSnapshot } from '../utils/firebase'
import Draft from './Draft'
const Wisiwyg = ()=>{
  
  
  const { state:{ editedVideo, previewVideoData },dispatch } = useGalleryState()
  const [ DBVideo,setDBVideo ] = useState(null)


  const contentToDB = async(richText) => {
    if(!editedVideo) dispatch({type:"SET_PREVIEW",payload:{key:"description",richText}})
    else {
      const videoToUpdate = {...DBVideo}
      videoToUpdate.description = richText
      const videoRef = doc(db, `hub/data/videos/${editedVideo}`)
      await updateDoc(videoRef, videoToUpdate)
    }
  }



  useEffect(()=>{
    const unsub = onSnapshot(doc(db, `hub/data/videos/${editedVideo}`), video => {
      setDBVideo(video.data()||previewVideoData)
    })
    return unsub
  },[])



  return (
   <div className="Wisiwyg">

    <label>Description</label>
    {DBVideo&&<Draft
        contentToDB={contentToDB}
        DBVideo={DBVideo}/>}
   </div>
  )
}

export default Wisiwyg