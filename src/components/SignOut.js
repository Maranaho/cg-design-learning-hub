import { auth } from '../utils/firebase'
import logout from '../assets/logout.svg'

const SignOut = ()=>{
  return (
    <main className="SignOut">
      <button className="btn mini ghost" onClick={()=>auth.signOut()}>
        <span>Sign out</span>
        {false&&<img width="15" src={logout} alt="logout"/>}
      </button>
    </main>
  )
}

export default SignOut
