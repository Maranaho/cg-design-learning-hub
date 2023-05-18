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
  path: "/",
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
  contributors:[
    "laura_huston@intuit.com",
    "kristen_haas@intuit.com",
    "alex_johnson@intuit.com",
    "kelsey_staub@intuit.com",
    "jess_tsuji@intuit.com",
    "tina_vu@intuit.com",
    "wendy_whatley@intuit.com",
    "sean_serrano@intuit.com",
    "benjamin_myers@intuit.com",
    "ethan_miller@intuit.com",
    "lucia_ferreira@intuit.com",
    // "chloe_walecki@intuit.com",
    "daviddominick_demarro@intuit.com",
    "maranaho_nguessan@intuit.com",
    "maranaho_n'guessan@intuit.com",
    "maranaho.nguessan@gmail.com"
  ],
  deletedVideos: [],
  tags: {
    mv1OnzpI3Z3HL2xQV: {
      label:'Getting started',
      craft:"systems"
    },
    kqWMB8W9yLW3L0eL: {
      label:'Foundations',
      craft:"systems"
    },
    p57D9POClg0lN68u: {
      label:'Components',
      craft:"systems"
    },
    wqDDqbDjEqeMU6Spx: {
      label: 'Workflow',
      craft: "systems"
    },
    vclIpTAnrpdBzpdUJ3v: {
      label:'Platform',
      craft: "systems"
    },
    vclIsfgbBzpdUJ3v: {
      label:'Figma tips',
      craft: "systems"
    },
    paw2zY28Y76cw21k5: {
      label: 'Native',
      craft: "systems"
    },
    hpPRurVvDEHXrmDAKrQ: {
      label:'Tips & tricks',
      craft: "motion"
    },
    QMKDQapl3yzCp06H7: {
      label:'How-to',
      craft: "motion"
    },
    QMKDQapl3yzCp06H7: {
      label:'How-to',
      craft: "motion"
    },
    QMKDQaplfgbCp06H7: {
      label:'Motion Prep',
      craft: "motion"
    },
    QMKDQaplfgbCp06H7: {
      label:'Figma Motion',
      craft: "motion"
    },
    QMKDfdfglfgbCp06H7: {
      label:'Metrics',
      craft: "motion"
    },
  },
  previewVideoData: {
    title: '',
    description: null,
    thumbnail: 0,
    featured:false,
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
    
    case 'PATH': {
      const PATH = { ...state }
      PATH.path = action.payload
      return PATH
    }
    
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
        featured:false,
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
