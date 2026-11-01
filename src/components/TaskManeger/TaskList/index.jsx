import React from 'react';
import {FaTrash} from 'react-icons/fa6';
import {connect} from 'react-redux';
import {
  checkTask,
  createNewTask,
  removeTask,
} from '../../../store/TaskManegerSlice';

function TaskList ({tasks, filter, changeTaskState, setNewTask, deleteTask}) {
  function deleteTaskHandler (id) {
    deleteTask(id);
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
    <section>
      <ul>
        {sortTasks(filterTasks()).map(t => {
          return (
            <li key={t.id}>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={({target: {checked}}) =>
                  checkTaskHandler(t.id, checked)
                }
              />
              <p>{t.name}</p>
              <button onClick={() => deleteTaskHandler(t.id)}>
                <FaTrash />
              </button>
            </li>
          );
        })}
      </ul>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
