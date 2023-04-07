import { useState,useEffect } from 'react'
import { db,collection, query, orderBy,onSnapshot } from '../utils/firebase'

const useUsers = ()=>{
  const [users,setUsers] = useState(null)

  useEffect(()=>{
    
    const dbUsers = []
    const userQuery = query(collection(db, "hub/data/users/"))
    const unsubscribe = onSnapshot(userQuery, querySnapshot => {
      
      querySnapshot.forEach(snap=> {
        const user = snap.data()
        user.userID = snap.id
        dbUsers.unshift(user)
      })
      setUsers(dbUsers)
    })

    return unsubscribe
  },[])
  if(users) return users.reduce((acc,itm)=>{
    acc[itm.userID] = itm
    return acc
  },{})
  return null
}

export default useUsers
