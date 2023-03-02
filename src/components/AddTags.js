import { useGalleryState } from '../context/gallery-context'
import { useEffect,useState } from 'react'
import { db,doc,addDoc,getDoc,updateDoc,onSnapshot,query,collection } from '../utils/firebase'



const AddTags = ()=>{
  
  const [ DBVideo,setDBVideo ] = useState(null)
  const [ tags,setTags ] = useState(null)
  const [recentTags,setRecentTags] = useState(null) 
  const [tagFilter,setTagFilter] = useState("") 
  const [focus,setFocus] = useState("") 
  const [recentHover,setRecentHover] = useState(false) 

  const { state:{ editedVideo,previewVideoData },dispatch } = useGalleryState()

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

  const filteredRecentTags = recentTags?recentTags
  .filter(tagKey=>editedVideo ? !DBVideo.tags.includes(tagKey) : true)
  .filter(tagKey=>tags[tagKey].label.toLocaleLowerCase().includes(tagFilter.toLocaleLowerCase())):[]

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
    const oldVideoRef = doc(db, `hub/data/videos/${editedVideo}`)
    const newTags = [...DBVideo.tags]
    newTags.push(newTagKey)
    await updateDoc(oldVideoRef, { tags: newTags})
    const newRecent = [...recentTags]
    newRecent.unshift(newTagKey)
    updateRecent(newRecent)
  }

  useEffect(()=>{
    const unsub = onSnapshot(doc(db, `hub/data/videos/${editedVideo}`), video => {
      setDBVideo(video.data()) 
    })
    return unsub
  },[])

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
  },[])


  useEffect(saveContent,[tags])


  return (
   <div className="AddTags">
      <label>Tags</label>

      <div className={`tagList ${focus}`}>
        <input
          className="search"
          onFocus={()=>setFocus("focus")}
          onBlur={()=>{
            if(!recentHover)setFocus("")
          }}
          value={tagFilter}
          onChange={e=>setTagFilter(e.target.value)}
          type="text"/>
        {DBVideo&&tags&&DBVideo.tags.map(tagKey=>(
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
        <div
          onMouseEnter={()=>setRecentHover(true)}
          onMouseLeave={()=>{
            setRecentHover(false)
            if(focus)setFocus(false)
          }}
          className="recent">
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

const Tag =({tagKey,tags,cb})=>{
  const { color,label } = tags[tagKey]
  const colors = ["red","green","purple","blue","yellow","pink"]
  return (
    <article className={colors[color]} onClick={()=>cb(tagKey)}>
      <span>#{label}</span>
    </article>
  )
}

export default AddTags