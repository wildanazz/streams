import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = (props) => {
  const { match, streams } = props;

  useEffect(() => {
    props.fetchStream(match.params.id);
  }, []);

  const onSubmit = (formValues) => {
    props.editStream(match.params.id, formValues);
  };

  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm initialValues={_.pick(streams, 'title', 'description')} onSubmit={onSubmit} />
    </div>
  );
};

StreamEdit.propTypes = {
  match: PropTypes.shape({ params: PropTypes.objectOf(PropTypes.string) }).isRequired,
  streams: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    userId: PropTypes.string,
    id: PropTypes.number,
  }),
  fetchStream: PropTypes.func.isRequired,
  editStream: PropTypes.func.isRequired,
};

StreamEdit.defaultProps = {
  streams: null,
};

const mapStateToProps = (state, ownProps) => {
  const { streams } = state;
  const { id } = ownProps.match.params;
  return { streams: streams[id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
