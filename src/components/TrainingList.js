import Loading from './Loading'
import NoAssetsFound from './NoAssetsFound'
import useVideos from '../hooks/useVideos'
import { useGalleryState } from '../context/gallery-context'
import {useEffect} from 'react'

const TrainingList = ()=>{
  const assets = useVideos()
  const { state:{ searchValue,bu,user },dispatch } = useGalleryState()



  return (
    <div> TrainingList</div>
  )
}

export default TrainingList
