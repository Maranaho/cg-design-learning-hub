import React from "react"

let initialGalleryState = {
  isIntuitEmployee:false,
  addVideo:false,
  formChecked:false,
  stateProgress:0,
  incompleteForm:true,
  wrongFormat:false,
  publishConfirmed:false,
  org:'@intuit.com',
  editedVideo:null,
  newKey:null,
  user:null,
  sortKey:null,
  msg:null,
  searchValue:'',
  filters:[],
  tags:{
    mv1OnzpI3Z3HL2xQV:"Getting started",
    kqWMB8W9yLW3L0eL:"Foundations",
    p57D9POClg0lN68u:"Components",
    wqDDqbDjEqeMU6Spx:"Workflow",
    vclIpTAnrpdBzpdUJ3v:"Platform",
    hpPRurVvDEHXrmDAKrQ:"Tips & tricks",
    paw2zY28Y76cw21k5:"Native",
    QMKDQapl3yzCp06H7:"Motion"
  },
  previewVideoData:{
    title:"",
    description:null,
    thumbnail:null,
    url:null,
    videoFile:null,
    thumbnailFile:null,
    views:0,
    likes:[],
    createdAt:"",
    helpful:[],
    notHelpful:[],
    uploader:"",
    tags:[]
  }
}

const GalleryContext = React.createContext()

function galleryReducer(state, action) {
  switch (action.type) {


    case 'SORT_KEY': {
      let SORT_KEY = {...state}
      SORT_KEY.sortKey = action.payload
      return SORT_KEY
    }

    case 'SEARCH': {
      let SEARCH = {...state}
      SEARCH.searchValue = action.payload
      return SEARCH
    }

    case 'NEWKEY': {
      let NEWKEY = {...state}
      NEWKEY.newKey = action.payload
      return NEWKEY
    }


    case 'PROGRESS': {
      let PROGRESS = {...state}
      PROGRESS.stateProgress = action.payload
      return PROGRESS
    }

    case 'CONFIRM_PUBLISH': {
      let CONFIRM_PUBLISH = {...state}
      CONFIRM_PUBLISH.publishConfirmed = action.payload
      return CONFIRM_PUBLISH
    }

    case 'WRONG_FORMAT': {
      let WRONG_FORMAT = {...state}
      WRONG_FORMAT.wrongFormat = action.payload
      return WRONG_FORMAT
    }

    case 'CHECK_FORM': {
      let CHECK_FORM = {...state}
      CHECK_FORM.formChecked = action.payload
      return CHECK_FORM
    }

    case 'INCOMPLETE_FORM': {
      let INCOMPLETE_FORM = {...state}
      INCOMPLETE_FORM.incompleteForm = action.payload
      return INCOMPLETE_FORM
    }

    case 'RESET_DEFAULT_VIDEO': {
      let RESET_DEFAULT_VIDEO = {...state}
      RESET_DEFAULT_VIDEO.previewVideoData = {
        title:"",
        thumbnail:null,
        url:null,
        videoFile:null,
        thumbnailFile:null,
        views:0,
        likes:[],
        createdAt:"",
        helpful:[],
        notHelpful:[],
        uploader:"",
        tags:[]
      }
      return RESET_DEFAULT_VIDEO
    }



    case 'SET_PREVIEW': {
      let SET_PREVIEW = {...state}
      const { key,val } = action.payload
      SET_PREVIEW.previewVideoData[key] = val 
      return SET_PREVIEW
    }

    case 'EDIT_VIDEO': {
      let EDIT_VIDEO = {...state}
      EDIT_VIDEO.editedVideo = action.payload
      return EDIT_VIDEO
    }

    case 'USER': {
      let USER = {...state}
      USER.user = action.payload
      return USER
    }

    case 'ADD_VIDEO': {
      let ADD_VIDEO = {...state}
      ADD_VIDEO.addVideo = action.payload
      ADD_VIDEO.editedVideo = null
      return ADD_VIDEO
    }


    case 'IS_FAM':{
      let IS_FAM = {...state}
      IS_FAM.isIntuitEmployee= action.payload
      return IS_FAM
    }


    default:
      throw new Error("Unexpected action");
  }
}

function GalleryStateProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    galleryReducer,
    initialGalleryState
  );
  const value = { state, dispatch };
  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
}

function useGalleryState() {
  const context = React.useContext(GalleryContext);
  if (context === undefined) {
    throw new Error(
      "useGalleryState must be used within a GalleryStateProvider"
    );
  }
  return context;
}

export { GalleryStateProvider, useGalleryState };
