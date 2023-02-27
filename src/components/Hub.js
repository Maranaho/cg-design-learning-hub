import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import TopBar from './TopBar'
import Detail from './Detail'
import TrainingList from './TrainingList'
import Admin from './Admin'
import AddEdit from './AddEdit'
import { useGalleryState } from '../context/gallery-context'

const Hub = ()=>{

  const { state: { addVideo,editedVideo} } = useGalleryState()

  return (
    <main className="DesignHub">
      <Router>
        <TopBar/>
        <div className="Routes">
          <Routes>
            <Route index element={<TrainingList/>} />
            <Route path="training/:videoID" element={<Detail />}/>
            <Route path="edit/:videoID" element={<Admin />}/>
            <Route path="admin" element={<Admin />}/>
            {/* <Route path="edit/:trainingID" element={<Upload edit/>}/> */}
          </Routes>
        </div>
       
        {(addVideo || editedVideo) && <AddEdit/>}
      </Router>
    </main>
  )
}

export default Hub
