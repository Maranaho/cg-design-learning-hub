import Loading from './Loading'
import NoAssetsFound from './NoAssetsFound'
import useVideos from '../hooks/useVideos'
import { useGalleryState } from '../context/gallery-context'
import {useEffect} from 'react'

const TrainingList = ()=>{
  const assets = useVideos()
  const { state:{ searchValue,bu,user },dispatch } = useGalleryState()



  return (
    <div className="SignIn">
      <h1>Training Videos</h1>
      <h2>Yay!!</h2>
    </div>
  )
}

export default TrainingList
