import {
  auth,
  provider,
  GoogleAuthProvider,
  signInWithPopup,
} from '../utils/firebase'


const NonIntuitUser = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => GoogleAuthProvider.credentialFromResult(res))
      .catch((err) => console.log(err))
  }
  return (
    <section className="NonIntuitUser">
      

      <div className="splash">
        <h1>Oops!</h1>
        <span>Please use your Intuit credentials to sign in</span>
        <button className="btn primary" onClick={signInWithGoogle}>Sign in</button>
      </div>


    </section>
  );
};

export default NonIntuitUser;
