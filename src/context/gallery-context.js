import React from "react"

let initialGalleryState = {
  isIntuitEmployee:false,
  addVideo:false,
  org:'@intuit.com',
  editedVideo:null,
  user:null,
  msg:null,
  searchValue:'',
  filters:[]
}

const GalleryContext = React.createContext()

function galleryReducer(state, action) {
  switch (action.type) {


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
