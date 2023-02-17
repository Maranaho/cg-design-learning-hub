import { useState,useEffect } from 'react'
import { auth,onAuthStateChanged } from '../utils/firebase'

const useAuth = ()=>{

  const [user,setUser] = useState(null)

  useEffect(()=>{
    onAuthStateChanged(auth, (user) =>setUser(user))
  },[])

  return user
}

export default useAuth
