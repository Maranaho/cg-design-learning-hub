import React, { useState } from 'react';
import { useHubState } from '../hub-context';
import SignOut from './SignOut';

const User = () => {
  const {
    state: { user },
  } = useHubState();
  const { displayName, photoURL } = user;
  const [showSignOut, setShowSignOut] = useState(false);
  return (
    <main className="User">
      {showSignOut && <SignOut />}
      {displayName.split(' ')[0]}
      {photoURL && (
        <img
          onClick={() => setShowSignOut(true)}
          onMouseLeave={() => {
            setTimeout(() => {
              setShowSignOut(false);
            }, 4000);
          }}
          src={photoURL}
          alt={displayName}
          width="40"
        />
      )}
    </main>
  );
};

export default User;
