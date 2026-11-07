import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {ClipLoader} from 'react-spinners';

import TASKS_VALIDATION_SCHEMA from '../../../Schemas/TasksValidationSchema';
import {createNewTask, setFilter} from '../../../store/TaskManegerSlice';
import {userThunk} from '../../../store/UserProfileSlice';

import styles from './TaskForm.module.sass';
import {div} from 'framer-motion/client';
import {PiExclamationMarkBold} from 'react-icons/pi';

const initialValues = {
  taskName: '',
};

function TaskForm (props) {
  const {AddNewTask, LoadUser, TaskManeger, UserProfile} = props;

  const {user} = UserProfile;
  useEffect(() => {
    LoadUser();
  }, []);

  function submitHandler (values, formikBag) {
    AddNewTask(values.taskName);
    formikBag.resetForm();
  }
  console.log(user);

  return (
    <>
      {/* User photo with error */}
      {UserProfile.error && (
        <div className={styles.userIngo}>
          <div className={styles.userImgContainer} title={UserProfile.error}>
            <PiExclamationMarkBold />
          </div>
        </div>
      )}

      {/* User photo while fetching */}
      {UserProfile.isFetching && (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <ClipLoader color='#4f46e5' size={30} aria-label='Loading Spinner' />
        </div>
      )}

      {/* User photo fulfilled */}
      {!UserProfile.isFetching && !UserProfile.error && user && (
        <div className={styles.userIngo}>
          <div className={styles.userImgContainer} title={user.name.first}>
            <img
              className={styles.userImg}
              src={user.picture.medium}
              alt={user.name.first}
            />
          </div>
        </div>
      )}
      
      {/* main section */}
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
    </>
  );
}
const mapStateToProps = state => {
  return {TaskManeger: state.TasksManeger, UserProfile: state.UserProfile};
};

const mapDispatchToProps = dispatch => {
  return {
    AddNewTask: data => dispatch(createNewTask(data)),
    LoadUser: () => dispatch(userThunk()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
