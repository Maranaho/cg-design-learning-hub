import { useGalleryState } from '../context/gallery-context'
import { useEffect,useState } from 'react'
import { db,doc,updateDoc,onSnapshot } from '../utils/firebase'
import upload from '../assets/icons/upload_blue.svg'



const VideoUploader = ()=>{
  
  const [ DBVideo,setDBVideo ] = useState(null)
  const [ videoSrc,setVideoSrc ] = useState(null)
  const [ poster,setPoster ] = useState(null)
  const [ error,setError ] = useState(false)
  const { state:{ editedVideo },dispatch } = useGalleryState()
  const handleUpdateData = async(key,val) => {
    if(!editedVideo) dispatch({type:"SET_PREVIEW",payload:{key,val:JSON.parse(val)}})
    else {
      const videoToUpdate = {...DBVideo}
      videoToUpdate[key] = val
      const videoRef = doc(db, `hub/data/videos/${editedVideo}`)
      await updateDoc(videoRef, videoToUpdate)
    }
  }

  const handleFileChange = (e,key) => {
    const file = e.target.files[0]
    if (file.type && (!file.type.startsWith('video/') && !file.type.startsWith('image/'))) {
      setError(true)
      setTimeout(()=>setError(false),2000)
      return
    }
    
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
     
      if(key === "url")setVideoSrc(reader.result)
      else setPoster(reader.result)
      handleUpdateData(key,JSON.stringify(reader.result))
    }
    
   }

  useEffect(()=>{
    const unsub = onSnapshot(doc(db, `hub/data/videos/${editedVideo}`), video => {
      setDBVideo(video.data())
      if(video.data()) {
        setVideoSrc(JSON.parse(video.data().url))
        setPoster(JSON.parse(video.data().poster))
      }
    })
    return unsub
  },[])


  return (
   <div className="VideoUploader">


    <label>Video</label>
    <div>
      <label className="btn ghost" htmlFor="video">{videoSrc?"Change video" : "Select a video"}</label>
      <label className="btn ghost" htmlFor="poster">{poster?"Change poster" : "Select a poster"}</label>
    </div>
  
    {videoSrc?(
      <video
        controls
        poster={poster}
        src={videoSrc}/>
    ):(
      <label
        htmlFor="video"
        className="VideoPlaceholder">
          <img src={upload}/>
        </label>
    )}
    
    {error&&<p>Not an image or a video</p>}

    <input
    id="poster"
    type="file"
    onChange={e=>handleFileChange(e,"poster")}/>
    <input
      id="video"
      type="file"
      onChange={e=>handleFileChange(e,"url")}/>
   </div>
  )
}

export default VideoUploader