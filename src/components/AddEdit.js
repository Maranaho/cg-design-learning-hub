import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import close from '../assets/icons/close.svg'
import { useHubState } from '../hub-context'
import DescriptionAndLinks from './DescriptionAndLinks'
import VideoUploader from './VideoUploader'
import AddTags from './AddTags'
import Publish from './Publish'
import Title from './Title'
import CraftChoice from './CraftChoice'
import Featured from './Featured'
import Msg from './Msg'
import Progress from './Progress'
import Success from './Success'
import PickThumb from './PickThumb'
import ConfirmDelete from './ConfirmDelete'

const AddEdit = () => {
  const [show, setShow] = useState('')
  const {
    state: {
      editedVideo,
      formChecked,
      incompleteForm,
      wrongFormat,
      stateProgress,
      publishConfirmed,
      pickThumb,
      deleteVideo,
    },
    dispatch,
  } = useHubState()

  const history = useHistory()

  const reallyClosing = () => {
    if (!editedVideo) {
      dispatch({ type: 'ADD_VIDEO', payload: false })
      dispatch({ type: 'NEWKEY', payload: null })
      dispatch({ type: 'RESET_DEFAULT_VIDEO' })
    } else {
      dispatch({ type: 'EDIT_VIDEO', payload: null })
      history.push('/admin')
    }
  }
  const handleClose = (published) => {
    if (pickThumb) {
      dispatch({ type: 'PICK_THUMB', payload: false })
      return
    }
    if (deleteVideo) {
      dispatch({ type: 'DELETE_VIDEO', payload: false })
      return
    }
    setShow('')
    setTimeout(() => {
      reallyClosing()
      if (published) dispatch({ type: 'CONFIRM_PUBLISH', payload: false })
    }, 400)
  }

  useEffect(() => setShow('show'), [])

  return (
    <div className={`AddEdit ${show}`}>
      {pickThumb && <PickThumb handleClose={handleClose} />}
      {deleteVideo && <ConfirmDelete handleClose={handleClose} />}
      {incompleteForm && formChecked && (
        <Msg
          status="error"
          msg="Nope, you need at least a title a video and a thumbnail"/>
      )}
      {wrongFormat && (
        <Msg
          status="error"
          msg="Wrong file type, thumbnail should be an image and video should be a video."/>
      )}

      <section>
        <button className="close" onClick={handleClose}>
          <img src={close} alt="close" />
        </button>
        {publishConfirmed && <Success handleClose={handleClose} />}
        {stateProgress > 0 && !publishConfirmed && (
          <Progress handleClose={handleClose} />
        )}
        {!pickThumb&&<div
          className={`uploadForm ${
            stateProgress > 0 || publishConfirmed ? 'loading' : ''
          }`}>
          <div className="videoNTags">
            <div>
              <Title />
              <Featured />
            </div>
            <AddTags />
          </div>
          <CraftChoice />
          <VideoUploader />
          <DescriptionAndLinks/>
          <Publish handleClose={handleClose} />
        </div>}
      </section>
    </div>
  )
}

export default AddEdit
