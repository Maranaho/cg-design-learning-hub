import { useGalleryState } from '../context/gallery-context'
import { useEffect, useState } from 'react'
import Dog from './Dog'

const Progress = ({handleClose})=>{

  const { state:{ stateProgress } } = useGalleryState()
  const [itsLong,setItsLong] = useState(false)
  useEffect(()=>{
    const clear = setTimeout(()=>setItsLong(true),10000)
    return ()=>clearTimeout(clear)
  },[])
  return (
    <div className="Progress">

      <span className="progressPercent">{stateProgress}%</span>
      <Dog/>
      <div className="progressBar">
        <div style={{width:stateProgress + "%"}}/>
      </div>
      {itsLong?(
        <div className="txt">
          <h1>It's taking forever!</h1>
          <p>You don't have to wait until the end</p>
          <p>You can safely close this panel.</p>
          <p>The upload will still run in the background</p>
          <br/>
          <p>Or you you can stay and watch the weiner dog get longer!</p>
          <button className="btn" onClick={handleClose}>Close</button>
        </div>
      ):<p>Uploading...</p>}
      
    </div>
  )
}
export default Progress