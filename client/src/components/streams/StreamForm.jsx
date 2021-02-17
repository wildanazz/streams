import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const renderField = ({ input: { onChange, value }, label, meta: { touched, error } }) => {
  return (
    <div className={`field ${touched && error ? 'error' : ''}`}>
      <label htmlFor={label}>
        {label}
        <div>
          <input onChange={onChange} value={value} placeholder={label} />
          {touched && error ? <span>{error}</span> : null}
        </div>
      </label>
    </div>
  );
};

const StreamForm = (props) => {
  const { handleSubmit, onSubmit } = props;

  const onSubmitForm = (formValues) => {
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="ui form error">
      <Field name="title" component={renderField} label="Title" />
      <Field name="description" component={renderField} label="Description" />
      <button type="submit" className="ui button primary">
        Submit
      </button>
    </form>
  );
};

const validate = (formProps) => {
  const errors = {};
  if (!formProps.title) {
    errors.title = 'You must enter a title.';
  }
  if (!formProps.description) {
    errors.description = 'You must enter a description.';
  }
  return errors;
};

StreamForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'streamForm', validate })(StreamForm);
