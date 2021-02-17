import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamCreate = (props) => {
  const onSubmit = (formValues) => {
    props.createStream(formValues);
  };

  return (
    <div>
      <h3>Create a Stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
};

StreamCreate.propTypes = {
  createStream: PropTypes.func.isRequired,
};

export default connect(null, { createStream })(StreamCreate);
