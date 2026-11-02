import {ErrorMessage, Field, Form, Formik} from 'formik';
import React from 'react';
import {connect} from 'react-redux';

import TASKS_VALIDATION_SCHEMA from '../../../Schemas/TasksValidationSchema';
import {createNewTask, setFilter} from '../../../store/TaskManegerSlice';

import styles from './TaskForm.module.sass';

const initialValues = {
  taskName: '',
};

function TaskForm (props) {
  const {AddNewTask, setNewFilter} = props;

  function submitHandler (values, formikBag) {
    console.log(values);
    AddNewTask(values.taskName);
    formikBag.resetForm();
  }

  return (
    <section className={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={TASKS_VALIDATION_SCHEMA}
      >
        <Form className={styles.form}>
          <div className={styles.fieldAndSubmitContainer}>
            <Field
              placeholder={'Ваша задача'}
              name={'taskName'}
              className={styles.taskInput}
            />
            <ErrorMessage
              className={styles.errorText}
              component={'div'}
              name={'taskName'}
            />
            <button className={styles.submitBtn} type='submit'>
              {'Додати задачу'}
            </button>
          </div>
        </Form>
      </Formik>
    </section>
  );
}
const mapStateToProps = state => {
  return state.TasksManeger;
};

const mapDispatchToProps = dispatch => {
  return {
    AddNewTask: data => dispatch(createNewTask(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
