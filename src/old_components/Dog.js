import { useGalleryState } from '../context/gallery-context'
import back from '../assets/images/dog/back.svg'
import front from '../assets/images/dog/front.svg'
import bird1 from '../assets/images/dog/bird1.svg'
import bird2 from '../assets/images/dog/bird2.svg'
import sun from '../assets/images/dog/sun.svg'
import cloud from '../assets/images/dog/cloud.svg'
import full from '../assets/images/dog/full.svg'
import weiner from '../assets/images/weiner.svg'
import { useRef,useEffect, useState } from 'react'

const Dog = ()=>{
  const cutoff = 1
  const { state:{ stateProgress } } = useGalleryState()
  const dogRef = useRef(null)
  const [width,setWidth] = useState(0)
  const getLeft = (left,strength) => (width - 100) * stateProgress / 100 * strength - left 
  useEffect(()=>{
    if(dogRef) {
      setWidth(dogRef.current.getBoundingClientRect().width)
    }
  },[dogRef])
  if(!dogRef) return <img className="weiner" src={weiner}/>
  return (

    <div className="Dog" ref={dogRef}>
      <img style={{transform: `translateX(${getLeft(78,.8) + "px)"}`}} className="bird2" src={bird1}/>
      <img style={{transform: `translateX(${getLeft(76,.7) + "px)"}`}} className="bird1" src={bird2}/>
      <img style={{transform: `translateX(${getLeft(20,.2) + "px)"}`}} className="sun" src={sun}/>
      <img style={{transform: `translateX(${getLeft(120,.8) + "px)"}`}} className="cloud" src={cloud}/>
      <div style={{width: (getLeft(0,.97) + 4) + "px"}} className="long"/>
      <img style={{transform: `translateX(${getLeft(76,.97) + "px)"}`}} className="dogFront" src={front}/>
      {stateProgress >= cutoff&&<img className="dogBack" src={back}/>}
    </div>
  )
}
export default Dog