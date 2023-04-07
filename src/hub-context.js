import React from 'react'

const initialHubState = {
  isIntuitEmployee: false,
  addVideo: false,
  formChecked: false,
  pickThumb: false,
  stateProgress: 0,
  incompleteForm: true,
  wrongFormat: false,
  publishConfirmed: false,
  deleteVideo: false,
  currentTag: null,
  org: '@intuit.com',
  editedVideo: null,
  newKey: null,
  user: null,
  sortKey: null,
  msg: null,
  searchValue: '',
  filters: [],
  showSearch: false,
  slideSearch:null,
  finalURL: "www.cg-design.intuit.com/detail/",
  deletedVideos: [],
  tags: {
    mv1OnzpI3Z3HL2xQV: 'Getting started',
    kqWMB8W9yLW3L0eL: 'Foundations',
    p57D9POClg0lN68u: 'Components',
    wqDDqbDjEqeMU6Spx: 'Workflow',
    vclIpTAnrpdBzpdUJ3v: 'Platform',
    hpPRurVvDEHXrmDAKrQ: 'Tips & tricks',
    paw2zY28Y76cw21k5: 'Native',
    QMKDQapl3yzCp06H7: 'Motion',
  },
  previewVideoData: {
    title: '',
    description: null,
    thumbnail: 0,
    url: null,
    videoFile: null,
    thumbnailFile: null,
    views: 0,
    craft: 'systems',
    likes: [],
    createdAt: '',
    helpful: [],
    notHelpful: [],
    uploader: '',
    tags: [],
  },
}

const HubContext = React.createContext()

function hubReducer(state, action) {
  switch (action.type) {
    
    case 'SHOW_SEARCH': {
      const SHOW_SEARCH = { ...state }
      SHOW_SEARCH.showSearch = action.payload
      return SHOW_SEARCH
    }
    
    case 'SLIDE_SEARCH': {
      const SLIDE_SEARCH = { ...state }
      SLIDE_SEARCH.slideSearch = action.payload
      return SLIDE_SEARCH
    }

    case 'HIDE_VIDEO': {
      const HIDE_VIDEO = { ...state }
      HIDE_VIDEO.deletedVideos.push(HIDE_VIDEO.editedVideo)
      return HIDE_VIDEO
    }

    case 'DELETED_VIDEO': {
      const DELETED_VIDEO = { ...state }
      DELETED_VIDEO.editedVideo = null
      DELETED_VIDEO.deleteVideo = false
      return DELETED_VIDEO
    }

    case 'DELETE_VIDEO': {
      const DELETE_VIDEO = { ...state }
      DELETE_VIDEO.deleteVideo = action.payload
      return DELETE_VIDEO
    }

    case 'PICK_THUMB': {
      const PICK_THUMB = { ...state }
      PICK_THUMB.pickThumb = action.payload
      return PICK_THUMB
    }

    case 'CURRENT_TAG': {
      const CURRENT_TAG = { ...state }
      CURRENT_TAG.currentTag = action.payload
      return CURRENT_TAG
    }

    case 'SORT_KEY': {
      const SORT_KEY = { ...state }
      SORT_KEY.sortKey = action.payload
      return SORT_KEY
    }

    case 'SEARCH': {
      const SEARCH = { ...state }
      SEARCH.searchValue = action.payload
      return SEARCH
    }

    case 'NEWKEY': {
      const NEWKEY = { ...state }
      NEWKEY.newKey = action.payload
      return NEWKEY
    }

    case 'PROGRESS': {
      const PROGRESS = { ...state }
      PROGRESS.stateProgress = action.payload
      return PROGRESS
    }

    case 'CONFIRM_PUBLISH': {
      const CONFIRM_PUBLISH = { ...state }
      CONFIRM_PUBLISH.publishConfirmed = action.payload
      return CONFIRM_PUBLISH
    }

    case 'WRONG_FORMAT': {
      const WRONG_FORMAT = { ...state }
      WRONG_FORMAT.wrongFormat = action.payload
      return WRONG_FORMAT
    }

    case 'CHECK_FORM': {
      const CHECK_FORM = { ...state }
      CHECK_FORM.formChecked = action.payload
      return CHECK_FORM
    }

    case 'INCOMPLETE_FORM': {
      const INCOMPLETE_FORM = { ...state }
      INCOMPLETE_FORM.incompleteForm = action.payload
      return INCOMPLETE_FORM
    }

    case 'RESET_DEFAULT_VIDEO': {
      const RESET_DEFAULT_VIDEO = { ...state }
      RESET_DEFAULT_VIDEO.previewVideoData = {
        title: '',
        thumbnail: 0,
        url: null,
        videoFile: null,
        thumbnailFile: null,
        views: 0,
        craft: 'systems',
        likes: [],
        createdAt: '',
        helpful: [],
        notHelpful: [],
        uploader: '',
        tags: [],
      }
      return RESET_DEFAULT_VIDEO
    }

    case 'SET_PREVIEW': {
      const SET_PREVIEW = { ...state }
      const { key, val } = action.payload
      SET_PREVIEW.previewVideoData[key] = val
      return SET_PREVIEW
    }

    case 'EDIT_VIDEO': {
      const EDIT_VIDEO = { ...state }
      EDIT_VIDEO.editedVideo = action.payload
      return EDIT_VIDEO
    }

    case 'USER': {
      const USER = { ...state }
      USER.user = action.payload
      return USER
    }

    case 'ADD_VIDEO': {
      const ADD_VIDEO = { ...state }
      ADD_VIDEO.addVideo = action.payload
      ADD_VIDEO.editedVideo = null
      return ADD_VIDEO
    }

    case 'IS_FAM': {
      const IS_FAM = { ...state }
      IS_FAM.isIntuitEmployee = action.payload
      return IS_FAM
    }

    default:
      throw new Error('Unexpected action')
  }
}

function HubStateProvider({ children }) {
  const [state, dispatch] = React.useReducer(hubReducer, initialHubState)
  const value = { state, dispatch }
  return <HubContext.Provider value={value}>{children}</HubContext.Provider>
}

function useHubState() {
  const context = React.useContext(HubContext)
  if (context === undefined) {
    throw new Error('useHubState must be used within a HubStateProvider')
  }
  return context
}

export { HubStateProvider, useHubState }
