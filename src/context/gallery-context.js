import React from "react"

let initialGalleryState = {
  isIntuitEmployee:false,
  showProgress:false,
  org:'@intuit.com',
  user:null,
  msg:null,
  teams:["NLAC","TT_Live","Assisted Tax"],
  searchValue:'',
  filters:[],
  openFilters:false,
  bu:'cg',
  jsonData:{},
  uploadJSONData:null,
}

const GalleryContext = React.createContext();

function galleryReducer(state, action) {
  switch (action.type) {


    case 'SET_ALL_JSONS': {
      let SET_ALL_JSONS = {...state}
      SET_ALL_JSONS.jsonData = action.payload
      return SET_ALL_JSONS
    }

    case 'SET_JSON': {
      let SET_JSON = {...state}
      const {assetID,jsonData} = action.payload
      if(assetID && jsonData)SET_JSON.jsonData[assetID] = jsonData
      else {
        SET_JSON.uploadJSONData = jsonData
        SET_JSON.jsonData = jsonData
      }

      return SET_JSON
    }

    case 'UPLOAD_PROGRESS': {
      let UPLOAD_PROGRESS = {...state}
      UPLOAD_PROGRESS.showProgress = action.payload
      return UPLOAD_PROGRESS
    }

    case "SET_SEARCH_VALUE": {
      let searchState = { searchValue: action.payload.toLowerCase().split(', ').join(',').split(' ,').join(',')}
      if (initialGalleryState.pristineSearch)
        searchState.pristineSearch = false
      return { ...state, ...searchState }
    }

    case 'SET_BU': {
      let SET_BU = {...state}
      SET_BU.bu = action.payload.toLowerCase()
      return SET_BU
    }

    case 'MANAGE_TAG_FILTERS': {
      let MANAGE_TAG_FILTERS = {...state}
      const tempFilters = [...MANAGE_TAG_FILTERS.filters]
      const tempSearch = [...MANAGE_TAG_FILTERS.searchValue.split(',')]

      const { add,tagSearchValue,dbTags } = action.payload
      if(dbTags){
        const tagIdx = tempFilters.indexOf(tagSearchValue)
        const searchIdx = tempSearch.indexOf(tagSearchValue)
        const tagIsInDBTags = dbTags.includes(tagSearchValue)
        if(add){
          tempSearch.push(tagSearchValue)
          if(tagIsInDBTags)tempFilters.push(tagSearchValue)
        }
        else {
          tempSearch.splice(searchIdx,1)
          if(tagIsInDBTags)tempFilters.splice(tagIdx,1)
        }
        MANAGE_TAG_FILTERS.searchValue = String(tempSearch)
        MANAGE_TAG_FILTERS.filters = tempFilters
      }
      return MANAGE_TAG_FILTERS
    }

    case 'CLEAR_TAGS': {
      let CLEAR_TAGS = {...state}
        CLEAR_TAGS.filters = []
        CLEAR_TAGS.searchValue = ''
      return CLEAR_TAGS
    }

    case 'TOGGLE_FILTERS': {
      let TOGGLE_FILTERS = {...state}
      TOGGLE_FILTERS.openFilters = action.payload
      return TOGGLE_FILTERS
    }

    case 'USER': {
      let USER = {...state}
      USER.user = action.payload
      return USER
    }


    case 'IS_FAM':{
      let IS_FAM = {...state}
      IS_FAM.isIntuitEmployee= action.payload
      return IS_FAM
    }

    case 'SET_MSG':{
      let SET_MSG = {...state}
      SET_MSG.msg = action.payload
      return SET_MSG
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
