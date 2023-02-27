import { Link } from 'react-router-dom'
import mg3 from '../assets/icons/mg3.svg'
import upload from '../assets/icons/upload.svg'
import { useGalleryState } from '../context/gallery-context'
import User from './User'

const TopBar = ()=>{
  const { state:{showProgress} } = useGalleryState()
  return (
    <main className="TopBar">
      <Link to="/" className="logo"><img src={mg3} alt="MotionGallery"/></Link>
      <article>

        <User/>
        <div className="uploadBtn">
          {showProgress?(
            <button disabled className="btn primary uploadBtn">
              <img width="20" src={upload} alt="upload"/>
              <span>Upload</span>
            </button>
          ):(
            <Link className="btn primary uploadBtn" to="/admin">
              <img width="20" src={upload} alt="upload"/>
              <span>Admin</span>
            </Link>
          )}
        </div>
      </article>
    </main>
  )
}

export default TopBar