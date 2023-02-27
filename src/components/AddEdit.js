import close from '../assets/icons/close.svg'
import { useGalleryState } from '../context/gallery-context'
import useVideos from '../hooks/useVideos'
import { useNavigate,useParams,useLocation } from 'react-router-dom'
import Loading from './Loading'




const AddEdit = ()=>{
  const { dispatch } = useGalleryState()
  const videos = useVideos()
  const location = useLocation()
  const { videoID } = useParams()
  const isAdmin = location.pathname.includes('/admin')
  const navigate = useNavigate()

  const handleClose = ()=>{
    dispatch({type:"EDIT_VIDEO",payload:null})
    dispatch({type:"ADD_VIDEO",payload:false})
    if(!isAdmin) navigate('/admin')
  }
  
  if(!videos) return <Loading/>
  return (
   <div className="AddEdit">
    <section>
      <button
        className="close"
        onClick={handleClose}>
          <img src={close} alt="close"/>
      </button>

    </section>
   </div>
  )
}

export default AddEdit