import { auth,provider,GoogleAuthProvider,signInWithPopup } from '../utils/firebase'

const SignIn = ()=>{

  const signInWithGoogle=()=>{
    signInWithPopup(auth, provider)
      .then(res => GoogleAuthProvider.credentialFromResult(res))
      .catch(err => console.log(err))
  }
  return (
    <main className="SignIn">
      <h1>Public facing page</h1>
      <button className="btn primary" onClick={signInWithGoogle}>Sign in</button>
    </main>
  )
}

export default SignIn
