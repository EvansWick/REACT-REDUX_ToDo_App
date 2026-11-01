import {ErrorMessage, Field, Form, Formik} from 'formik';
import React from 'react';
import {connect} from 'react-redux';

import TASKS_VALIDATION_SCHEMA from '../../../Schemas/TasksValidationSchema';
import {createNewTask, setFilter} from '../../../store/TaskManegerSlice';

const initialValues = {
  taskName: '',
};

function TaskForm (props) {
  const {AddNewTask, setNewFilter} = props;

  function submitHandle (values) {
    console.log(values);
    AddNewTask(values.taskName);
  }

  function isMyFilter (filter) {
    return filter === props.filter;
  }

  return (
    <section>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandle}
        validationSchema={TASKS_VALIDATION_SCHEMA}
      >
        <Form>
          <Field name={'taskName'} />
          <button type='submit'>Add</button>
          <ErrorMessage name={'taskName'} />
        </Form>
      </Formik>
      <button onClick={() => setNewFilter('all')}>ALL</button>
      <button onClick={() => setNewFilter('active')}>ACTIVE</button>
      <button onClick={() => setNewFilter('completed')}>COMPLETED</button>
    </section>
  );
}
const mapStateToProps = state => {
  return state.TasksManeger;
};

const mapDispatchToProps = dispatch => {
  return {
    AddNewTask: data => dispatch(createNewTask(data)),
    setNewFilter: data => dispatch(setFilter(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
