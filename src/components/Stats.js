import { useParams } from 'react-router-dom'
import { useGalleryState } from '../context/gallery-context'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'



const Stats = ()=>{
  const { dispatch } = useGalleryState()
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
      <button className="addNew btn" onClick={handleAddNew}>Upload new video</button>
    </section>
  )
}
export default Stats