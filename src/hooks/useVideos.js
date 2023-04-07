import { useState,useEffect } from 'react'
import { db,collection, query, orderBy,onSnapshot } from '../utils/firebase'

const useVideos = ()=>{
  const [videos,setVideos] = useState(null)




  useEffect(()=>{
    
    const dbVideos = []
    const videoQuery = query(collection(db, "hub/data/videos/"), orderBy("createdAt"))
    const unsubscribe = onSnapshot(videoQuery, querySnapshot => {
      
      querySnapshot.forEach(snap=> {
        const video = snap.data()
        video.videoID = snap.id
        dbVideos.unshift(video)
      })
      setVideos(dbVideos)
    })

    return unsubscribe
  },[])

  if(videos) return videos.reduce((acc,itm)=>{
    acc[itm.videoID] = itm
    return acc
  },{})
  return null
}

export default useVideos
