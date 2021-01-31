import React, { useState, useEffect } from 'react';

const GoogleAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState('Amet');

  useEffect(() => {
    window.gapi.load('client:auth2', async () => {
      await window.gapi.client.init({
        clientId: '1038043623827-i60q9lsi3t1cbdplluee35dvfl8hcrpm.apps.googleusercontent.com',
        scope: 'email',
      });
      console.log('Dolor');
      const auth = window.gapi.auth2.getAuthInstance();
      setIsSignedIn(auth.isSignedIn.get());
      auth.isSignedIn.listen(() => {
        // This event listener cannot read state changes
        console.log('Sit');
        console.log(isSignedIn);
        setIsSignedIn(auth.isSignedIn.get());
      });
    });
    console.log('Ipsum');
  }, []);

  const onClickSignIn = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const onClickSignOut = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const renderAuthButton = () => {
    console.log('Lorem');
    console.log(isSignedIn);
    if (isSignedIn === 'Amet') {
      return (
        <button type="button" className="ui red google button">
          <i className="google icon" />
        </button>
      );
    }

    if (isSignedIn === true) {
      return (
        <button type="button" className="ui red google button" onClick={onClickSignOut}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    }

    return (
      <button type="button" className="ui red google button" onClick={onClickSignIn}>
        <i className="google icon" />
        Sign In
      </button>
    );
  };

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
