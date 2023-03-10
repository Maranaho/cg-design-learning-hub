import { useGalleryState } from '../context/gallery-context'
import { useEffect,useState } from 'react'
import { db,doc,onSnapshot } from '../utils/firebase'



const Tag =({tagKey,tags,cb})=>{
  const [ DBVideo,setDBVideo ] = useState(null)
  const { state:{ editedVideo,user } } = useGalleryState()
  const { color,label } = tags[tagKey]
  const colors = ["red","green","purple","blue","yellow","pink"]

  const handleTagClick = ()=>{
     const isOwner = editedVideo && DBVideo ? user.email === DBVideo.uploader : true
   if(cb && isOwner)cb(tagKey)
  }
  
  useEffect(()=>{
    const unsub = onSnapshot(doc(db, `hub/data/videos/${editedVideo}`), video => {
      setDBVideo(video.data())
    })
    return unsub
  },[editedVideo])

    return (
      <article className={`Tag ${colors[color]}`} onClick={handleTagClick}>
        <span>#{label}</span>
      </article>
    )
  }
  export default Tag