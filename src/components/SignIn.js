import {
  auth,
  provider,
  GoogleAuthProvider,
  signInWithPopup,
} from '../utils/firebase'
import logo from '../assets/images/cg-hub-logo.svg'

const SignIn = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => GoogleAuthProvider.credentialFromResult(res))
      .catch((err) => console.log(err))
  }
  return (
    <main className="SignIn">
      <div className="splash">
        <img src={logo} className="logo" alt="cg-hub-logo" />
        <h1>Learning Hub</h1>
        <button className="btn primary" onClick={signInWithGoogle}>Sign in</button>
        <span>Intuit account required</span>
      </div>
    </main>
  )
}

export default SignIn
