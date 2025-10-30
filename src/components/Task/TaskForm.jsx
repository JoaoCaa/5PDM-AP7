import React, { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';

function TaskForm() {
  const [taskText, setTaskText] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() === '') return;

    addTask(taskText.trim());
    setTaskText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="O que precisa ser feito?"
        style={{ padding: '10px', width: '300px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>
        Adicionar Tarefa
      </button>
    </form>
  );
}

export default TaskForm;