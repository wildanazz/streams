import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

const GoogleAuth = (props) => {
  const { isSignedIn } = props;

  const onAuthChange = (e) => {
    const auth = window.gapi.auth2.getAuthInstance();
    if (e) {
      props.signIn(auth.currentUser.get().getId());
    } else {
      props.signOut();
    }
  };

  useEffect(() => {
    window.gapi.load('client:auth2', async () => {
      await window.gapi.client.init({
        clientId: '1038043623827-i60q9lsi3t1cbdplluee35dvfl8hcrpm.apps.googleusercontent.com',
        scope: 'email',
      });
      const auth = window.gapi.auth2.getAuthInstance();
      onAuthChange(auth.isSignedIn.get());
      auth.isSignedIn.listen(onAuthChange);
    });
  }, []);

  const onClickSignIn = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const onClickSignOut = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
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
        Sign In with Google
      </button>
    );
  };

  return <div>{renderAuthButton()}</div>;
};

GoogleAuth.propTypes = {
  isSignedIn: PropTypes.bool,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

GoogleAuth.defaultProps = {
  isSignedIn: null,
};

const mapStateToProps = (state) => {
  const { isSignedIn } = state.auth;
  return { isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
