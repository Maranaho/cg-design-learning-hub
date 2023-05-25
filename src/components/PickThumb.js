import React, { useState, useEffect } from 'react'
import { useHubState } from '../hub-context'
import { db, doc, updateDoc, onSnapshot } from '../utils/firebase'
import uuidv4 from "uuid/v4"
import components16 from '../assets/images/thumbnails/components16.svg'
import figma_tips16 from '../assets/images/thumbnails/figma_tips16.svg'
import foundations24 from '../assets/images/thumbnails/foundations24.svg'
import getting_started28 from '../assets/images/thumbnails/getting_started28.svg'
import metrics23 from '../assets/images/thumbnails/metrics23.svg'
import motion_figma19 from '../assets/images/thumbnails/motion_figma19.svg'
import motion_how_to20 from '../assets/images/thumbnails/motion_how_to20.svg'
import motion_prep16 from '../assets/images/thumbnails/motion_prep16.svg'
import motion_tips_and_tricks21 from '../assets/images/thumbnails/motion_tips_and_tricks_21.svg'
import native16 from '../assets/images/thumbnails/native16.svg'
import platform_technology16 from '../assets/images/thumbnails/platform_technology16.svg'
import workflow16 from '../assets/images/thumbnails/workflow16.svg'
const categories = [
  components16,
  figma_tips16,
  foundations24,
  getting_started28,
  metrics23,
  motion_figma19,
  motion_how_to20,
  motion_prep16,
  motion_tips_and_tricks21,
  native16,
  platform_technology16,
  workflow16
]

const width = 160
const height = 90
const PickThumb = ({ handleClose }) => {
  const {
    state: { editedVideo },
    dispatch,
  } = useHubState()
  const [DBVideo, setDBVideo] = useState(null)

  const handleThumChange = async (thumbIdx,category) => {
    if (editedVideo) {
      if (DBVideo) {
        const videoToUpdate = { ...DBVideo }
        videoToUpdate.thumbnail = {thumbIdx,category}
        const videoRef = doc(db, `hub/data/videos/${editedVideo}`)
        await updateDoc(videoRef, videoToUpdate)
        handleClose()
      }
    } else {
      dispatch({
        type: 'SET_PREVIEW',
        payload: {
          key: 'thumbnail',
          val: thumbIdx
        }
      })
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, `hub/data/videos/${editedVideo}`),
      (video) => setDBVideo(video.data()),
    )
    return unsub
  }, [editedVideo])

  return (
    <section className="PickThumb">
      <div>
        <h3>Pick a thumbnail:</h3>
        <div>
          {categories.map(categorie=>{
            const name = categorie.split(".")[0].split("/")[3]
            const category = name.slice(0, -2).split("_").join(" ")
            const nbOfImages = Number(name.slice(name.length - 2, name.length))
            return (
              <div key={uuidv4()}>
                <h4>{category}</h4>
                <div className="grid" >
                  {Array.from(Array(nbOfImages).keys()).map(thumbIdx=>{
                    return (
                      <div className="thumbSprite" key={uuidv4()}>
                        <img
                          height={height} src={categorie}
                          onClick={()=>handleThumChange(thumbIdx,category)}
                          style={{ transform:`translateX(-${thumbIdx*width}px)` }}/>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
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
