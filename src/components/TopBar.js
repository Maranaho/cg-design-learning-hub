import { Link } from 'react-router-dom'
import User from './User'

const TopBar = ()=> (
  <main className="TopBar">
    <Link to="/" className="logo">
      <span>Design</span>
      <strong>HUB</strong>
    </Link>
    <article>

      <User/>
      <Link className="btn primary uploadBtn" to="/admin">
        <span>Admin</span>
      </Link>
    </article>
  </main>
)

export default TopBar