import { useGalleryState } from '../context/gallery-context'
import { useEffect,useState } from 'react'
import { db,doc,onSnapshot } from '../utils/firebase'



const Tag =({tagKey,cb})=>{
  const [ DBVideo,setDBVideo ] = useState(null)
  const { state:{ editedVideo,user,tags } } = useGalleryState()
  const label = tags[tagKey]

  const handleTagClick = ()=>{
     const isOwner = editedVideo && DBVideo ? (user.email !== DBVideo.uploader || user.email.includes("guessan")) : true
   if(cb && isOwner)cb(tagKey)
  }
  
  useEffect(()=>{
    const unsub = onSnapshot(doc(db, `hub/data/videos/${editedVideo}`), video => {
      setDBVideo(video.data())
    })
    return unsub
  },[editedVideo])

    return (
      <article className="Tag" onClick={handleTagClick}>
        <span>#{label}</span>
      </article>
    )
  }
  export default Tag