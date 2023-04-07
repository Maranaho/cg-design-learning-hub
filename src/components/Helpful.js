import React ,{useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useVideo from '../hooks/useVideo'
import likeIcn from '../assets/icons/helpful.svg'
import activeLikeIcn from '../assets/icons/helpful_blue.svg'
import {
  db,
  doc,
  onSnapshot,
  updateDoc
} from '../utils/firebase'
import { useHubState } from '../hub-context'

const Helpful = () => {
  const { state: { user } } = useHubState()
  const { videoID } = useParams()
  const DBVideo = useVideo(videoID)
  const [dbHelpful,setHelpful] = useState(null)
  const [dbNotHelpful,setNotHelpful] = useState(null)


  const handleHelpfulClick = e =>{
    const classes = e.target.classList
    const isHelpful = classes.contains("helpful")
    const notHelpful = classes.contains("notHelpful")
    if(isHelpful || notHelpful) updateHelpful(isHelpful)
  }

  const updateHelpful = async isHelpful => {
    const dbVideoToUpdate = doc(db, `hub/data/videos/${videoID}`)
    const helpfulList = { ...DBVideo }.helpful
    const notHelpfulList = { ...DBVideo }.notHelpful

    if(isHelpful) {
      if(helpfulList.includes(user.email)) helpfulList.splice(helpfulList.indexOf(user.email),1)
      else helpfulList.push(user.email)
      await updateDoc(dbVideoToUpdate, { helpful: helpfulList })
    } else {
      if(notHelpfulList.includes(user.email)) notHelpfulList.splice(notHelpfulList.indexOf(user.email),1)
      else notHelpfulList.push(user.email)
      await updateDoc(dbVideoToUpdate, { notHelpful: notHelpfulList })
    }
  }

  useEffect(()=>{

    const unsub = onSnapshot(doc(db, "hub/data/videos/", videoID), doc => {
        const {
          helpful:dbHelpful,
          notHelpful:dbNotHelpful
        } = doc.data()

        setHelpful(dbHelpful)
        setNotHelpful(dbNotHelpful)
    })
    return unsub

  },[])

if(!dbHelpful||!dbNotHelpful) return null
  return (
    <button onClick={handleHelpfulClick} className="btn">
      <span>Was this helpful?</span>
      <img
        className="helpful"
        src={dbHelpful.includes(user.email)?activeLikeIcn:likeIcn}
        alt="likes"/>
      <span>{dbHelpful.length}</span>
      <img
        src={dbNotHelpful.includes(user.email)?activeLikeIcn:likeIcn}
        className="notHelpful dislike"
        alt="dislikes"/>
      <span>{dbNotHelpful.length}</span>
    </button>
    )
}
export default Helpful
