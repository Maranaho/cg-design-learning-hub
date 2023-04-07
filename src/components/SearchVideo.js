import React from 'react'
import { useHubState } from '../hub-context'

const SearchVideo = () => {
  const { state: { searchValue }, dispatch} = useHubState()

  return (
    
      <input
        value={searchValue}
        onChange={(e) => dispatch({ type: 'SEARCH', payload: e.target.value })}
        placeholder="Search by name, tags, uploader..."
        type="search"/>

  )
}
export default SearchVideo
