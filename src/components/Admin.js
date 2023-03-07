import useVideos from '../hooks/useVideos'
import Loading from './Loading'
import { useGalleryState } from '../context/gallery-context'
import AddEdit from './AddEdit'
import EditVideo from './EditVideo'
import Msg from './Msg'
import Stats from './Stats'
import SearchVideo from './SearchVideo'
import { db,onSnapshot,query,collection } from '../utils/firebase'
import { useState,useEffect } from 'react'
import Heads from './Heads'




const Admin = ()=>{
  const videos = useVideos()
  const { state: { addVideo,editedVideo,publishConfirmed},dispatch } = useGalleryState()
  const [dbTags,setTags] = useState(null)


  
  useEffect(()=>{
    
    const dbTagsQuery = query(collection(db,'hub/data/tags/'))
    const unsub = onSnapshot(dbTagsQuery, snapshot => {
      let tmpTags = {}
      snapshot.forEach(snap => {
        tmpTags[snap.id] = snap.data()
      })
      setTags(tmpTags)
    })
    return unsub
  },[editedVideo])

  if(!videos||!Object.keys(videos).length || !dbTags)return <Loading/>
  return (
    <section className="Dashboard">
      {publishConfirmed && <Msg msg="The video was successfully uploaded"/>}
      {(addVideo || editedVideo) && <AddEdit/>}
      <div className="Admin">
        <div>
        <SearchVideo/>
        <nav className="videosToEdit">
          <table
            cellPadding="0"
            cellSpacing="0">
              <Heads/>
              <tbody  className='tbody'>
                {Object.keys(videos).map(videoID=>(
                  <EditVideo
                    dbTags={dbTags}
                    DBVideo={videos[videoID]}
                    key={videoID}
                    videoID={videoID} />
                ))}
              </tbody>
          </table>
        </nav>
        </div>
        <Stats/>
      </div>
    </section>
  )
}
export default Admin