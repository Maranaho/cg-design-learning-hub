import React ,{ useEffect } from 'react'
import useVideos from '../hooks/useVideos'
import Video from './Video'
import NoMatch from './NoMatch'
import SearchVideo from './SearchVideo'
import close from '../assets/icons/close-circle.svg'
import { useHubState } from '../hub-context'

const Search = () => {
  const { state: { currentTag,slideSearch,searchValue,tags,deletedVideos },dispatch } = useHubState()
  const videos = useVideos()
  const notArchived = video => !video.hasOwnProperty('archived')

  const handleCloseSearch = ()=>{
    dispatch({type:"SLIDE_SEARCH",payload:null})
    setTimeout(()=>dispatch({type:"SHOW_SEARCH",payload:false}),1000)
  }

  useEffect(()=>{
    setTimeout(()=>dispatch({type:"SLIDE_SEARCH",payload:"show"}),300)
  },[])

  if (!videos || !Object.keys(videos).length) return null

  const filterdVideos = Object.keys(videos)
    .filter(videoID => {
      const search = searchValue.toLowerCase()
      const title = videos[videoID].title.toLowerCase()
      const uploader = videos[videoID].uploader.toLowerCase()
      const vidTags = videos[videoID].tags
        .reduce((acc, itm) => {
          acc += tags[itm]
          return acc
        }, '')
        .toLowerCase()
      return (
        (title.includes(search) ||
          uploader.includes(search) ||
          vidTags.includes(search)) &&
        !deletedVideos.includes(videoID) &&
        !videos[videoID].hasOwnProperty('archived')
      )
    })
    .filter(videoKey =>
    currentTag
      ? videos[videoKey].tags.includes(currentTag) &&
        notArchived(videos[videoKey])
      : notArchived(videos[videoKey])
  )
  return (
    <div className={`Search ${slideSearch}`}>
      <section>
        <button onClick={handleCloseSearch} className="close"><img src={close} alt="close"/></button>
        <header>
          <SearchVideo/>
        </header>
        {!filterdVideos.length && <NoMatch />}
        <div className="list">
        <h3>{searchValue !== ""?"Search results":"Most recent"}</h3>
          <div className="results">
            {filterdVideos.map((videoID) => (
              <Video key={videoID} video={videos[videoID]} />
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
export default Search
