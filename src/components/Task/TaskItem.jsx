import React from 'react';
import { useTasks } from '../../hooks/useTasks';
import './TaskItem.css'; // ✅ Importa o CSS

function TaskItem({ task }) {
  const { deleteTask } = useTasks();

  return (
    <li className="taskitem">
      <span
        className={`taskitem__text ${task.completed ? 'taskitem__text--done' : ''}`}
      >
        {task.text}
      </span>

      <button
        onClick={() => deleteTask(task.id)}
        className="taskitem__delete"
      >
        Excluir
      </button>
    </li>
  );
}

export default TaskItem;
