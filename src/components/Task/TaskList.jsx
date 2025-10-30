import React from 'react';
import { useTasks } from '../../hooks/useTasks';
import TaskItem from './TaskItem';

function TaskList() {
  const { tasks, loading } = useTasks();

  if (loading) {
    return <div>Carregando tarefas...</div>;
  }

  if (tasks.length === 0) {
    return <div>Nenhuma tarefa encontrada. Comece a adicionar!</div>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;