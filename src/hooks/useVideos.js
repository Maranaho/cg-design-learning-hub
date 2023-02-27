import { useState,useEffect } from 'react'
import { db,collection, query, orderBy, startAfter, limit, getDocs } from '../utils/firebase'


const useVideos = ()=>{
  const [videos,setVideos] = useState(null)



  useEffect(()=>{
    const getVideoFromFB = async()=>{
      const dbVideos = []
      const firstVideo = query(collection(db, "hub/data/videos/"), orderBy("createdAt"))
      const documentSnapshots = await getDocs(firstVideo)


      documentSnapshots.forEach(snap=> {
        const video = snap.data()
        video.videoID = snap.id
        dbVideos.unshift(video)
      })
      setVideos(dbVideos)
    }
    getVideoFromFB()
  },[])

  if(videos)return videos.reduce((acc,itm)=>{
    acc[itm.videoID] = itm
    return acc
  },{})
}

export default useVideos
