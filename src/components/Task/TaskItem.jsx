import React from 'react';
import { useTasks } from '../../hooks/useTasks';

function TaskItem({ task }) {
  const { deleteTask } = useTasks();

  // Implementação futura: Adicionar lógica para alternar 'completed'
  // const toggleTask = () => { /* ... lógica de update do Firestore ... */ };

  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px dotted #eee' }}>
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      <div>
        {/* <button onClick={toggleTask} style={{ marginRight: '10px', cursor: 'pointer' }}>
          {task.completed ? 'Desfazer' : 'Concluir'}
        </button> */}
        <button onClick={() => deleteTask(task.id)} style={{ color: 'red', cursor: 'pointer' }}>
          Excluir
        </button>
      </div>
    </li>
  );
}

export default TaskItem;