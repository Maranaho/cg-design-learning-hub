import { useGalleryState } from '../context/gallery-context'
import { useEffect,useState } from 'react'
import useAuth from '../hooks/useAuth'
import {

  //firestore
  db,
  doc,
  onSnapshot,
  collection,
  addDoc,
  Timestamp,

  //storage
  getStorage,
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL} from '../utils/firebase'



const Publish = ({handleClose})=>{

  const urls = {}
  const user = useAuth()
  const [ DBVideo,setDBVideo ] = useState(null)
  const [ disable,setDisable ] = useState(false)
  const { state:{ editedVideo,previewVideoData,stateProgress }, dispatch } = useGalleryState()

  const handlePublish =()=>{

    if(!editedVideo && (!previewVideoData.videoFile || !previewVideoData.thumbnailFile)){
      dispatch({type:"INCOMPLETE_FORM",payload:true})
      dispatch({type:"CHECK_FORM",payload:true})
      setTimeout(()=>dispatch({type:"CHECK_FORM",payload:false}),3000)
      return
    }
    
    if(editedVideo && DBVideo){
      confirmPublish()
    } else {
      if(previewVideoData.videoFile && previewVideoData.thumbnailFile){
        const { videoFile,thumbnailFile } = previewVideoData
        upload([videoFile,thumbnailFile])
      }
    }
  }


  
  const upload = files =>{

    const storage = getStorage()
    files.forEach(file=>{
      const type = file.type.startsWith('image/') ? "thumbnail" : "url"
      const storageRef = ref(storage, `hub/${file.name.split(' ').join('-')}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      const handleProgress = snap => {
        const progress = (snap.bytesTransferred / snap.totalBytes) * 100
        console.log(progress);
        dispatch({type:"PROGRESS",payload:progress})
      }

      const handleError = err => console.error(err)

      const handleSuccess = ()=> getDownloadURL(uploadTask.snapshot.ref).then(url => {
        urls[type] = url
        if(Object.keys(urls).length === 2) urlToDB(url,type)
      })

      uploadTask.on('state_changed', 
        ()=>
          handleProgress,
          handleError, 
          handleSuccess
      )
    })
  }

  const urlToDB = async() =>{
      const videoData = {...previewVideoData,...urls}
      videoData.createdAt= Timestamp.now()
      videoData.uploader = user.email
      
      delete videoData.thumbnailFile
      delete videoData.videoFile
      
      // deleteFile('figma.png')
      // deleteFile('peter.mp4')
      // return
      addDoc(collection(db, `hub/data/videos/`), videoData)
      confirmPublish()
  }

  const confirmPublish = ()=>{
    dispatch({type:"CONFIRM_PUBLISH",payload:true})
    setTimeout(() => dispatch({type:"CONFIRM_PUBLISH",payload:false}), 3000)
    setDisable(true)
    handleClose()
  }


  const deleteFile = fileName =>{
    const storage = getStorage()
    const reff = ref(storage, `hub/${fileName}`);
    deleteObject(reff)
  }
 

  


  useEffect(()=>{
    const unsub = onSnapshot(doc(db, `hub/data/videos/${editedVideo}`), video => setDBVideo(video.data()) )
    return unsub
  },[])

  
  return (
    <div className="Publish">
      {stateProgress!==0&&<span>{stateProgress}</span>}
      <button disabled={disable} onClick={handlePublish} className="btn">{editedVideo?"Update":"Publish"} video</button>
    </div>
  )
}
export default Publish