import { useState,useEffect } from 'react'
import { db,doc,getDoc } from '../utils/firebase'

const useVideo = videoID =>{

  const [video,setVideo] = useState(null)
  
  useEffect(()=>{
    const getVideoFromFB = async()=> {

      const dbVideo = doc(db,"hub/data/videos/"+videoID)
      const snap = await getDoc(dbVideo)
      if(snap.exists())setVideo(snap.data())
    }
    getVideoFromFB()
  },[])

  if(video)return video
  return null
}

export default useVideo
