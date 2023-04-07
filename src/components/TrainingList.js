import React from 'react'
import HubTitle from './HubTitle'
import Filters from './Filters'
import VideoList from './VideoList'
import Search from './Search'
import { useHubState } from '../hub-context'

const TrainingList = () => {
const { state: { showSearch } } = useHubState()
  return (
    <div className="TrainingList">
      {showSearch&&<Search />}
      <HubTitle />
      <Filters />
      <VideoList />
    </div>
  )
}

export default TrainingList
