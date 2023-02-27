import { useEffect } from 'react'
import { useGalleryState } from './context/gallery-context'
import useAuth from './hooks/useAuth'
import './App.css'

import SignIn from './components/SignIn'
import NonIntuitUser from './components/NonIntuitUser'
import Hub from './components/Hub'


const App = ()=>{

    const {
      state: { isIntuitEmployee,org },
      dispatch
    } = useGalleryState()

  const user = useAuth()


  const getUser =()=>{
    if(user){
      const { displayName,email,photoURL } = user
      const isFam = email.indexOf(org) !== -1
      if(isFam !== isIntuitEmployee) dispatch({type:'IS_FAM',payload:isFam})
      dispatch({type:'USER',payload:{displayName,email,photoURL}})
    } else dispatch({type:'IS_FAM',payload:false})
  }

  useEffect(getUser,[user])

  return (
    <>
      {user&&!isIntuitEmployee&&<NonIntuitUser/>}
      {user&&isIntuitEmployee&&<Hub/>}
      {!user&&<SignIn/>}
    </>
  )
}

export default App
