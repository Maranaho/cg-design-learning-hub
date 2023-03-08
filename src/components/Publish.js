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
  const { state:{ editedVideo,previewVideoData }, dispatch } = useGalleryState()

  const handlePublish =()=>{

    // deleteFile('recap.mov')
    //   return
    setDisable(true)
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
        if(type === "url" && progress > 0)dispatch({type:"PROGRESS",payload:Math.round(progress)})
        else dispatch({type:"PROGRESS",payload:1})
      }

      const handleError = err => console.error(err)

      const handleSuccess = ()=> getDownloadURL(uploadTask.snapshot.ref).then(url => {
        urls[type] = url
        if(Object.keys(urls).length === 2) urlToDB(url,type)
      })

      uploadTask.on('state_changed', 
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
    
    const newKey = await addDoc(collection(db, `hub/data/videos/`), videoData)
    dispatch({type:"NEWKEY",payload:newKey.id})
    confirmPublish()
  }

  const confirmPublish = ()=>{
    if(editedVideo)handleClose()
    
    setDisable(true)
    setTimeout(()=>{
      dispatch({type:"PROGRESS",payload:0})
      if(!editedVideo)dispatch({type:"CONFIRM_PUBLISH",payload:true})
    },500)
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
      <button disabled={disable} onClick={handlePublish} className="btn">{editedVideo?"All set":"Publish video"}</button>
    </div>
  )
}
export default Publish