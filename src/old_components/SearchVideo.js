import { useGalleryState } from '../context/gallery-context'

const SearchVideo = ()=>{
  const { state:{searchValue}, dispatch } = useGalleryState()

  return (
    <section className="SearchVideo">
      {/* <label>Search videos</label> */}
      <input
        value={searchValue}
        onChange={e=>dispatch({type:"SEARCH",payload:e.target.value})}
        placeholder="Search by name, tags, uploader..."
        type="search"/>
      <button className="btn ghost mini">Search</button>    </section>
  )
}
export default SearchVideo