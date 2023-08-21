import { Link } from 'react-router-dom'
import logo from '../assets/images/cg-hub-logo.svg'
import search from '../assets/icons/search_w.svg'
import { useHubState } from '../hub-context'
// import { auth } from '../utils/firebase'
// onClick={() => auth.signOut()}
const TopBar = () => {
  const { state:{ contributors,user },dispatch } = useHubState()
  
  return (
    <main className="TopBar">
      <Link to="/" className="logo">
        <img src={logo} alt="cg-hub-logo" />
      </Link>
      <article>
        <ul>
          <li><Link to="/systems">Systems</Link></li>
          <li><Link to="/motion">Motion</Link></li>
          <li><Link to="/content">Content</Link></li>
          {contributors.includes(user.email)&&<li><Link to="/admin">Admin</Link></li>}
        </ul>
        <button onClick={()=>dispatch({type:"SHOW_SEARCH",payload:true})} className="search"><img width="20" src={search} alt="search" /></button>
      </article>
    </main>
  )
}

export default TopBar
