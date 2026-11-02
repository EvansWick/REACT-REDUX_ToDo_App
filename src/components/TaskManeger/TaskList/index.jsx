import React from 'react';
import {FaTrash} from 'react-icons/fa6';
import {connect} from 'react-redux';
import {motion, AnimatePresence} from 'framer-motion';
import {
  checkTask,
  removeTask,
  setFilter,
} from '../../../store/TaskManegerSlice';

import styles from './TaskList.module.sass';
import classNames from 'classnames';

function TaskList (props) {
  const {tasks, filter, changeTaskState, setNewFilter, deleteTask} = props;
  function deleteTaskHandler (id) {
    deleteTask(id);
  }

  function isMyFilter (filter) {
    return filter === props.filter;
  }

  function checkTaskHandler (id, checked) {
    changeTaskState({id: id, isDone: checked});
  }
  function filterTasks () {
    return tasks.filter(t => {
      if (filter === 'completed') return t.isDone;
      if (filter === 'active') return !t.isDone;
      return true;
    });
  }
  function sortTasks (tasksArray) {
    return [...tasksArray].sort((a, b) => a.isDone - b.isDone);
  }
  return (
    <section className={styles.listContainer}>
      <ul className={styles.taskList}>
        <AnimatePresence mode='popLayout'>
          {sortTasks(filterTasks()).map(t => {
            return (
              <motion.li
                /* Анімація появи */
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                /* Анімація при видаленні */
                exit={{opacity: 0, scale: 0.9, transition: {duration: 0.2}}}
                /* Налаштування пружини для переміщення */
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                }}
                layout={'position'}
                key={t.id}
                className={styles.taskItem}
              >
                <input
                  type='checkbox'
                  checked={t.isDone}
                  onChange={({target: {checked}}) =>
                    checkTaskHandler(t.id, checked)
                  }
                />
                <p
                  title={t.name}
                  className={classNames(styles.taskName, {
                    [styles.completed]: t.isDone,
                    [styles.active]: !t.isDone,
                  })}
                >
                  {t.name}
                </p>
                <button
                  className={styles.trashBtn}
                  onClick={() => deleteTaskHandler(t.id)}
                >
                  <FaTrash />
                </button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
      <div className={styles.sectionsConainer}>
        <button
          className={classNames(styles.sectionBtn, {
            [styles.sectionBtnActive]: isMyFilter('all'),
          })}
          onClick={() => setNewFilter('all')}
        >
          {'Всі'}
        </button>
        <button
          className={classNames(styles.sectionBtn, {
            [styles.sectionBtnActive]: isMyFilter('active'),
          })}
          onClick={() => setNewFilter('active')}
        >
          {'Активні'}
        </button>
        <button
          className={classNames(styles.sectionBtn, {
            [styles.sectionBtnActive]: isMyFilter('completed'),
          })}
          onClick={() => setNewFilter('completed')}
        >
          {'Виконані'}
        </button>
      </div>
    </section>
  );
}

const mapStateToProps = state => {
  return state.TasksManeger;
};

const mapDispatchToProps = dispatch => {
  return {
    changeTaskState: data => dispatch(checkTask(data)),
    setNewTask: data => dispatch(createNewTask(data)),
    deleteTask: data => dispatch(removeTask(data)),
    setNewFilter: data => dispatch(setFilter(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
