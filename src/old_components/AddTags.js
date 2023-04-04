import { useGalleryState } from '../context/gallery-context'
import { useEffect,useState,useRef } from 'react'
import { db,doc,addDoc,getDoc,updateDoc,onSnapshot,collection } from '../utils/firebase'
import Tag from './Tag'
import Loading from './Loading'

const AddTags = ()=>{
  
  const [ DBVideo,setDBVideo ] = useState(null)
  const [recentTags,setRecentTags] = useState(null) 
  const [tagFilter,setTagFilter] = useState("") 
  const [focus,setFocus] = useState("") 
  const [recentHover,setRecentHover] = useState(false) 
  const [tagsHeight,setTagsHeight] = useState(0) 
  const [loaded,setLoaded] = useState(false) 
  const tagsHeightRef = useRef(null)

  const { state:{ editedVideo,previewVideoData,user,tags },dispatch } = useGalleryState()

  const saveAfterRemove = key => {
    const newRecent = [...recentTags]
    newRecent.unshift(key)
    updateRecent(newRecent)
  }
  const handleRemove = async(key) =>{
    if(editedVideo){
      const videoTags = doc(db, `hub/data/videos/${editedVideo}`)
      const newTags = {...DBVideo}.tags.filter(tag=>tag!==key)
      await updateDoc(videoTags, { tags: newTags })
      saveAfterRemove(key)
    } else {
      const newTags = {...previewVideoData}.tags.filter(tag=>tag!==key)
      dispatch({type:"SET_PREVIEW",payload:{key:"tags",val:newTags}})
      saveAfterRemove(key)
    }
    
  }


  const addTag = async(key) =>{

    setTagFilter("")
    if(editedVideo){
      const videoTags = doc(db, `hub/data/videos/${editedVideo}`)
      const newTags = {...DBVideo}.tags
      newTags.push(key)
      await updateDoc(videoTags, { tags: newTags })
    } else {
      const newTags = {...previewVideoData}.tags
      newTags.push(key)
      dispatch({type:"SET_PREVIEW",payload:{key:"tags",val:newTags}})
    }
    updateRecent([...recentTags].filter(tag=>tag!==key))
  }



  
  const saveContent = () => {
    
    if(tags){
      const oldList = JSON.parse(window.localStorage.getItem('recentTags')) || []
      const updatedList = [...oldList,...Object.keys(tags)]
      updateRecent(updatedList)
    }
  }

  const updateRecent = newList => {
    setRecentTags([...new Set(newList)])
    window.localStorage.setItem('recentTags', JSON.stringify([...new Set(newList)]))
  }

  const filteredRecentTags = recentTags && DBVideo?recentTags
  .filter(tagKey=>editedVideo ? !DBVideo.tags.includes(tagKey) : !previewVideoData.tags.includes(tagKey))
  .filter(tagKey=>tags[tagKey].toLocaleLowerCase().includes(tagFilter.toLocaleLowerCase())):[]

  const createNewTag = async()=>{

    setTagFilter("")
    const hubData = doc(db, `hub/data/`)
    const colorSnap = await getDoc(hubData)
    const currentColor = colorSnap.data().currentColor
    const newNumber = currentColor < 4 ? currentColor + 1 : 0
    await updateDoc(hubData, { currentColor: newNumber})
    const newTag = {
      label: tagFilter,
      color:newNumber
    }
    
    const newTagRef = await addDoc(collection(db, `hub/data/tags/`), newTag)
    const newTagKey = newTagRef.id

    if(editedVideo){
      const oldVideoRef = doc(db, `hub/data/videos/${editedVideo}`)
      const newTags = [...DBVideo.tags]
      newTags.push(newTagKey)
      await updateDoc(oldVideoRef, { tags: newTags})
    } else {
      const tempTags = [...previewVideoData.tags]
      tempTags.push(newTagKey)
      dispatch({type:"SET_PREVIEW",payload:{key:"tags",val:tempTags}})
    }

    const newRecent = [...recentTags]
    newRecent.unshift(newTagKey)
    updateRecent(newRecent)
  }

  useEffect(()=>{
    const unsub = onSnapshot(doc(db, `hub/data/videos/${editedVideo}`), video => {
      setDBVideo(video.data()) 
    })
    return unsub
  },[editedVideo])


  // useEffect(()=>{
    
  //   const dbTagsQuery = query(collection(db,'hub/data/tags/'))
  //   const unsub = onSnapshot(dbTagsQuery, snapshot => {
  //     let tmpTags = {}
  //     snapshot.forEach(snap => {
  //       tmpTags[snap.id] = snap.data()
  //     })
  //     setTags(tmpTags)
  //   })
  //   return unsub
  // },[editedVideo])


  useEffect(saveContent,[editedVideo,tags])

  useEffect(()=>{
    if(tagsHeightRef && DBVideo){
      setTagsHeight(tagsHeightRef.current.getBoundingClientRect().height)
    }
  },[tagsHeightRef,recentTags,editedVideo,DBVideo])

  useEffect(()=>{
    if(tagsHeightRef && !loaded){
      setTimeout(()=>{
        setLoaded(true)
      },700)
    }
  },[tagsHeightRef,editedVideo])


  return (
   <div className="AddTags">
      <label>Tags</label>
      <div
        style={{height:`${tagsHeight + 60}px`}}
        className={`tagList ${focus} ${loaded?"loaded":""}`}>
        
        <div ref={tagsHeightRef}>
          {editedVideo&&DBVideo&&tags&&DBVideo.tags.map(tagKey=>(
            <Tag
              key={tagKey}
              tagKey={tagKey}
              cb={handleRemove}
              tags={tags}/>
          ))}
          {!editedVideo&&tags&&previewVideoData.tags.map(tagKey=>(
            <Tag
              key={tagKey}
              tagKey={tagKey}
              cb={handleRemove}
              tags={tags}/>
          ))}
        </div>
        <input
          className="search"
          disabled={editedVideo && DBVideo ? (user.email !== DBVideo.uploader && !user.email.includes("guessan")): false}
          onFocus={()=>setFocus("focus")}
          onBlur={()=>{
            if(!recentHover)setFocus("")
          }}
          value={tagFilter}
          placeholder={`${focus?"Type":"Click"} to pick or create tag...`}
          onChange={e=>setTagFilter(e.target.value)}
          type="text"/>
          
        <div
          style={{top:`${tagsHeight + 70}px`}}
          className={`recent ${DBVideo&&DBVideo.tags.length === 0 ? "short":""}`}
          onMouseEnter={()=>setRecentHover(true)}
          onMouseLeave={()=>{
            setRecentHover(false)
            if(focus)setFocus(false)
          }}>
          <label>Most used</label>
          {recentTags&&filteredRecentTags.length === 0 && (
            <button
              className="btn"
              onClick={createNewTag}>Create new tag</button>
          )}
          {recentTags&&filteredRecentTags.map(tagKey=>(
            <Tag
              key={tagKey}
              tagKey={tagKey}
              cb={addTag}
              tags={tags}/>
          ))}
        </div>
      </div>
   </div>
  )
}

export default AddTags