import React, { useState, useEffect } from 'react'
import { useHubState } from '../hub-context'
import { db, doc, updateDoc, onSnapshot } from '../utils/firebase'
import uuidv4 from "uuid/v4"
import thumbz from '../utils/thumbz'
import chevron from '../assets/icons/chevron.svg'

const width = 160
const height = 90
const gridGap = 10
const nbOfColumns = 3
const PickThumb = ({ handleClose }) => {
  const {
    state: { editedVideo },
    dispatch,
  } = useHubState()
  const [DBVideo, setDBVideo] = useState(null)
  const [currentCat, setCurrentCat] = useState(0)

  const handleThumChange = async src => {
    if (editedVideo) {
      if (DBVideo) {
        const videoToUpdate = { ...DBVideo }
        videoToUpdate.thumbnail = src
        const videoRef = doc(db, `hub/data/videos/${editedVideo}`)
        await updateDoc(videoRef, videoToUpdate)
        handleClose()
      }
    } else {
      dispatch({
        type: 'SET_PREVIEW',
        payload: {
          key: 'thumbnail',
          val: src
        }
      })
      handleClose()
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, `hub/data/videos/${editedVideo}`),
      video => setDBVideo(video.data()),
    )
    return unsub
  }, [editedVideo])

  return (
    <section className="PickThumb">
      <div>
        <h3>Pick a thumbnail:</h3>
       
        {Object.keys(thumbz).map((category,catIdx)=>{
          const nbOfLines = Math.ceil(thumbz[category].length / nbOfColumns) 

          const calculatedHeight = nbOfLines * height + ((nbOfLines - 1) * gridGap)
          return (
            <article key={uuidv4()} className={`Category ${currentCat === catIdx?"current":""}`}>
              <h4 onClick={()=>setCurrentCat(catIdx)}>
                <span>{category.split("_").join(" ")}</span>
                <img src={chevron}/>
              </h4>
              <div className="thumbGrid" style={{height: currentCat === catIdx ? calculatedHeight : 0}}>
                {thumbz[category].map(thumb=><img onClick={()=>handleThumChange(thumb)} width={width} src={thumb} key={uuidv4()}/>)}
              </div>
            </article>
          )
        })}
      </div>
      <div className="btnCtn">
        <button onClick={handleClose} className="btn">
          <span>Continue</span>
        </button>
      </div>
    </section>
  )
}
export default PickThumb
