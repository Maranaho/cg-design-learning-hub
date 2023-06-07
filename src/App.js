import React, { useEffect } from 'react'
import useAuth from './hooks/useAuth'
import useUsers from './hooks/useUsers'
import { useHubState } from './hub-context'
import './App.css'

import SignIn from './components/SignIn'
import NonIntuitUser from './components/NonIntuitUser'
import Hub from './components/Hub'
import { db, setDoc, doc } from './utils/firebase'

const App = () => {
  const {
    state: { isIntuitEmployee, org },
    dispatch,
  } = useHubState()

  const users = useUsers()
  const user = useAuth()

  const getUser = () => {
    if (user) {
      const { displayName, email, photoURL } = user
      const isFam = email.indexOf(org) !== -1 || email === "maranaho.nguessan@gmail.com"
      if (isFam !== isIntuitEmployee) {
        dispatch({ type: 'IS_FAM', payload: isFam })
        dispatch({ type: 'USER', payload: { displayName, email, photoURL } })
      }
        

      if (users && !users.hasOwnProperty(email)) {
        const newUser = {
          displayName,
          photoURL,
          preferredName: displayName,
        }
        setDoc(doc(db, 'hub/data/users/', email), newUser)
      }
    } else dispatch({ type: 'IS_FAM', payload: false })
  }
  useEffect(getUser, [user, !users])

  return (
    <>
      {user && !isIntuitEmployee && <NonIntuitUser />}
      {user && isIntuitEmployee && <Hub />}
      {!user && <SignIn />}
    </>
  )
}

export default App
