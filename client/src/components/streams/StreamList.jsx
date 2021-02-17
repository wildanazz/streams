import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

const StreamList = (props) => {
  const { streams, userId, isSignedIn } = props;

  useEffect(() => {
    props.fetchStreams();
  }, []);

  const renderEditAndDelete = (stream) => {
    if (stream.userId === userId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <button type="button" className="ui button negative">
            Delete
          </button>
        </div>
      );
    }
    return null;
  };

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/create" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
    return null;
  };

  const renderList = () => {
    return streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {renderEditAndDelete(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </div>
  );
};

StreamList.propTypes = {
  streams: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.number,
    }),
  ).isRequired,
  userId: PropTypes.string,
  fetchStreams: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
};

StreamList.defaultProps = {
  userId: null,
  isSignedIn: null,
};

const mapStateToProps = (state) => {
  const { streams, auth } = state;
  return { streams: Object.values(streams), userId: auth.userId, isSignedIn: auth.isSignedIn };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
