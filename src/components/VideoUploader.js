import { useGalleryState } from '../context/gallery-context'
import { useEffect,useState } from 'react'
import { db,doc,updateDoc,onSnapshot,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL } from '../utils/firebase'
import uploadImg from '../assets/icons/upload_blue.svg'



const VideoUploader = ()=>{
  
  const [ DBVideo,setDBVideo ] = useState(null)
  const [ videoSrc,setVideoSrc ] = useState(null)
  const [ thumbnail,setThumbnail ] = useState(null)
  const { state:{ editedVideo,incompleteForm, previewVideoData, formChecked, wrongFormat,user},dispatch } = useGalleryState()

  const handleProgress = snap => {
    const progress = (snap.bytesTransferred / snap.totalBytes) * 100
    console.log(progress);
    dispatch({type:"PROGRESS",payload:progress})
  }

  const handleError = err => console.error(err)

  const handleSuccess = (uploadTask,type) => getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
    const videoRef = doc(db, `hub/data/videos/${editedVideo}`)
    const fileToUpdate = {}
    fileToUpdate[type] = url
    await updateDoc(videoRef, fileToUpdate)
    //celebrate success
  })

  const upload = file =>{

    const type = file.type.startsWith('image/') ? "thumbnail" : "url"

    const storage = getStorage()
    const storageRef = ref(storage, `hub/${file.name.split(' ').join('-')}`)
    const uploadTask = uploadBytesResumable(storageRef, file)



    uploadTask.on('state_changed', 
      ()=>
        handleProgress,
        handleError, 
        ()=>handleSuccess(uploadTask,type)
    )
    
  }

  const checkUpload = file => {
    const { size, name } = file
    const extension = name.split('.').pop()
    let fileSize = " > 1 GB"
    if(size < 1000000) fileSize = (size / 1000).toFixed(2) + " kb"
    if(size >= 1000000 && size < 1000000000 ) fileSize = (size / 1000000).toFixed(2) + " mb"
    if(size >= 1000000000 && size < 1000000000000 ) fileSize = (size / 1000000000).toFixed(2) + " gb"
    console.log({ size, name, extension,fileSize })
  }

  const handleFileChange = async(e,key) => {
    if(!e.target.files.length)return
    const file = e.target.files[0]
    checkUpload(file)
    const notAnImageOrVideo = file.type && (!file.type.startsWith('video/') && (!file.type.startsWith('image/')))
    const wrongFormat = (key === "url" && file.type.startsWith('image/')) || (key === "thumbnail" && file.type.startsWith('video/'))
    if (notAnImageOrVideo || wrongFormat) {
      dispatch({type:"WRONG_FORMAT",payload:true})
      setTimeout(()=>dispatch({type:"WRONG_FORMAT",payload:false}),4000)
      return
    }
    const blobURL = URL.createObjectURL(file)
    if(key === "url")setVideoSrc(blobURL)
    else setThumbnail(blobURL)
    dispatch({type:"SET_PREVIEW",payload:{key:key === "url"?"videoFile":"thumbnailFile",val:file}})
    if(editedVideo)upload(file)
    
   }



  useEffect(()=>{
    const unsub = onSnapshot(doc(db, `hub/data/videos/${editedVideo}`), video => {
      setDBVideo(video.data())
      if(video.data()) {
        setVideoSrc(video.data().url)
        setThumbnail(video.data().thumbnail)
      } else {
        setVideoSrc(null)
        setThumbnail(null)
      }
    })
    return unsub
  },[editedVideo])


  return (
   <div className={`VideoUploader ${(incompleteForm && formChecked || wrongFormat) && ((editedVideo && !DBVideo.url) || (!editedVideo && !previewVideoData.url))?"error":""}`}>

    
    <label>Video *</label>
   
    <div className="videoCtn">
      {videoSrc?(
        <video
          controls
          poster={thumbnail}
          src={videoSrc}/>
      ):(
        <label
          htmlFor="video"
          className="VideoPlaceholder">
            <img src={uploadImg}/>
          </label>
      )}
      <div className="btnCtn">
        {editedVideo && DBVideo ? user.email !== DBVideo.uploader : videoSrc &&(
          <label
            className="btn ghost"
            htmlFor="video">{videoSrc?"Change video" : "Select a video"}</label>
        )}
        {editedVideo && DBVideo ? user.email !== DBVideo.uploader : true && <label
          className="btn"
          htmlFor="thumbnail">{thumbnail?"Change thumbnail" : "Select a thumbnail"}</label>}
      </div>
    </div>

    <form encType="multipart/form-data">
      <input
        id="thumbnail"
        type="file"
        disabled={editedVideo && DBVideo ? user.email !== DBVideo.uploader : false}
        onChange={e=>handleFileChange(e,"thumbnail")}/>
      <input
        id="video"
        type="file"
        disabled={editedVideo && DBVideo ? user.email !== DBVideo.uploader : false}
        onChange={e=>handleFileChange(e,"url")}/>
    </form>
   </div>
  )
}

export default VideoUploader