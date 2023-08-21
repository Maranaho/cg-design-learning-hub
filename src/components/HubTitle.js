import React ,{ useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useHubState } from '../hub-context'
import {H1} from "@cgds/typography"

const HubTitle = () => {
  const { dispatch} = useHubState()
  const location = useLocation()
  const path = location.pathname.split('/')[1]

  useEffect(()=>{
    dispatch({type:"PATH",payload:path})
  },[path])

  return (
    <header className={`HubTitle ${path !== ""?"skinny":""}`}>
      <section className="center">
        {path === 'motion' ?<Motion /> : path === 'systems' ? <Systems /> : path === 'content' ? <Content />: <Home />}
      </section>
    </header>
  )
}

const Home = ()=> (
  <H1>
    <span>Welcome</span>
    <span>to the</span>
    <span>Learning Hub</span>
  </H1>
)
const Motion = ()=><H1 className="motion"><span>Motion</span></H1>
const Systems = ()=><H1 className="systems"><span>Systems</span></H1>
const Content = ()=><H1 className="content"><span>Content</span></H1>


export default HubTitle
