import React from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

import styles from './TaskManeger.module.sass';

function TaskManeger () {
  return (
    <article className={styles.componentContainer}>
      <div className={styles.wrapper}>
        <TaskForm />
        <TaskList />
      </div>
    </article>
  );
}

export default TaskManeger;
