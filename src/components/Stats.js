import { useGalleryState } from '../context/gallery-context'
import { useNavigate } from 'react-router-dom'



const Stats = ()=>{
  const { state:{stateProgress},dispatch } = useGalleryState()
  const navigate = useNavigate()
  const handleAddNew = ()=>{
    dispatch({type:"ADD_VIDEO",payload:true})
    dispatch({type:"RESET_DEFAULT_VIDEO"})
    navigate('/admin')
  }

  return (
    <section className="Stats SignIn">
      <h1>Stats</h1>
      <h2>Data about the perfomance of the videos</h2>
      <button
        disabled={stateProgress > 0}
        className="addNew btn"
        onClick={handleAddNew}>
          <span>{stateProgress > 0? "Uploading...":"Upload new video"}</span>
        { stateProgress > 0 &&<span className="prog" style={{width:stateProgress+"%"}}/>}
      </button>
    </section>
  )
}
export default Stats