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
import NoMatch from './NoMatch'




const Admin = ()=>{
  const videos = useVideos()
  const { state: { addVideo,editedVideo,searchValue} } = useGalleryState()
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

  const filteredVideos = Object.keys(videos)
  .filter(videoID=>{
    const search = searchValue.toLowerCase()
    const title = videos[videoID].title.toLowerCase()
    const uploader = videos[videoID].uploader.toLowerCase()
    const tags = videos[videoID].tags.reduce((acc,itm)=>{
      acc += dbTags[itm].label
      return acc
    },"").toLowerCase()
    return title.includes(search) || uploader.includes(search) || tags.includes(search)
  })
  return (
    <section className="Dashboard">
      {(addVideo || editedVideo) && <AddEdit/>}
      <div className="Admin">
        <div>
        <SearchVideo/>
        <nav className="videosToEdit">
          <table
            cellPadding="0"
            cellSpacing="0">
              <Heads/>
              <tbody className='tbody'>
                {filteredVideos.map(videoID=>(
                  <EditVideo
                    dbTags={dbTags}
                    DBVideo={videos[videoID]}
                    key={videoID}
                    videoID={videoID} />
                ))}
              </tbody>
          </table>
          {!filteredVideos.length&&<NoMatch/>}
        </nav>
        </div>
        <Stats/>
      </div>
    </section>
  )
}
export default Admin