import React, { useEffect, useState, useRef } from 'react'
import { useHubState } from '../hub-context'
import {
  db,
  doc,
  updateDoc,
  onSnapshot
} from '../utils/firebase'
import Tag from './Tag'

const AddTags = () => {
  const [DBVideo, setDBVideo] = useState(null)
  const [recentTags, setRecentTags] = useState(null)
  const [tagFilter, setTagFilter] = useState('')
  const [focus, setFocus] = useState('')
  const [recentHover, setRecentHover] = useState(false)
  const [tagsHeight, setTagsHeight] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const tagsHeightRef = useRef(null)

  const { state: { editedVideo, previewVideoData, user, tags }, dispatch } = useHubState()

  const saveAfterRemove = key => {
    const newRecent = [...recentTags]
    newRecent.unshift(key)
    updateRecent(newRecent)
  }
  const handleRemove = async key => {
    if (editedVideo) {
      const videoTags = doc(db, `hub/data/videos/${editedVideo}`)
      const newTags = { ...DBVideo }.tags.filter(tag => tag !== key)
      await updateDoc(videoTags, { tags: newTags })
      saveAfterRemove(key)
    } else {
      const newTags = { ...previewVideoData }.tags.filter((tag) => tag !== key)
      dispatch({ type: 'SET_PREVIEW', payload: { key: 'tags', val: newTags } })
      saveAfterRemove(key)
    }
  }

  const addTag = async key => {
    setTagFilter('')
    if (editedVideo) {
      const videoTags = doc(db, `hub/data/videos/${editedVideo}`)
      const newTags = { ...DBVideo }.tags
      newTags.push(key)
      await updateDoc(videoTags, { tags: newTags })
    } else {
      const newTags = { ...previewVideoData }.tags
      newTags.push(key)
      dispatch({ type: 'SET_PREVIEW', payload: { key: 'tags', val: newTags } })
    }
    updateRecent([...recentTags].filter((tag) => tag !== key))
  }

  const saveContent = ()=> {
    if (tags) {
      const oldList =
        JSON.parse(window.localStorage.getItem('recentTags')) || []
      const updatedList = [...oldList, ...Object.keys(tags)]
      updateRecent(updatedList)
    }
  }

  const updateRecent = newList => {
    setRecentTags([...new Set(newList)])
    window.localStorage.setItem(
      'recentTags',
      JSON.stringify([...new Set(newList)]),
    )
  }

  const filteredRecentTags =
    DBVideo
      ? DBVideo.tags
          .filter(tagKey =>
            editedVideo
              ? !DBVideo.tags.includes(tagKey)
              : !previewVideoData.tags.includes(tagKey),
          )
          .filter(tagKey => tags[tagKey].toLowerCase().includes(tagFilter.toLowerCase()))
      : []

  useEffect(()=> {
    const unsub = onSnapshot(
      doc(db, `hub/data/videos/${editedVideo}`),video => setDBVideo(video.data()))
    return unsub
  }, [editedVideo])

  useEffect(saveContent, [editedVideo, tags])

  useEffect(()=> {
    if (tagsHeightRef && DBVideo) {
      setTagsHeight(tagsHeightRef.current.getBoundingClientRect().height)
    }
  }, [tagsHeightRef, recentTags, editedVideo, DBVideo])

  useEffect(() => {
    if (tagsHeightRef && !loaded) {
      setTimeout(() => {
        setLoaded(true)
      }, 700)
    }
  }, [tagsHeightRef, editedVideo, loaded])

  return (
    <div className="AddTags">
      <label>Tags</label>
      <div
        style={{ height: `${tagsHeight + 60}px` }}
        className={`tagList ${focus} ${loaded ? 'loaded' : ''}`}>
        <div ref={tagsHeightRef}>
          {editedVideo &&
            DBVideo &&
            tags &&
            DBVideo.tags.map((tagKey) => (
              <Tag key={tagKey} tagKey={tagKey} cb={handleRemove} tags={tags} />
            ))}
          {!editedVideo &&
            tags &&
            previewVideoData.tags.map((tagKey) => (
              <Tag key={tagKey} tagKey={tagKey} cb={handleRemove} tags={tags} />
            ))}
        </div>
        <input
          className="search"
          disabled={
            editedVideo && DBVideo ? user.email !== DBVideo.uploader : false
          }
          onFocus={() => setFocus('focus')}
          onBlur={() => {
            if (!recentHover) setFocus('')
          }}
          value={tagFilter}
          placeholder={`${focus ? 'Type' : 'Click'} to pick or create tag...`}
          onChange={(e) => setTagFilter(e.target.value)}
          type="text"/>

        <div
          style={{ top: `${tagsHeight + 70}px` }}
          className={`recent ${
            DBVideo && DBVideo.tags.length === 0 ? 'short' : ''
          }`}
          onMouseEnter={() => setRecentHover(true)}
          onMouseLeave={() => {
            setRecentHover(false)
            if (focus) setFocus(false)
          }}>
          <label>Most used</label>
     
          {Object.keys(tags).filter(tagKey=>DBVideo?!DBVideo.tags.includes(tagKey):!previewVideoData.tags.includes(tagKey)).map(tagKey => <Tag key={tagKey} tagKey={tagKey} cb={addTag} tags={tags} />)}
        </div>
      </div>
    </div>
  )
}

export default AddTags
