import React from 'react';
import TaskForm from '../components/Task/TaskForm';
import TaskList from '../components/Task/TaskList';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { currentUser } = useAuth();
  
  return (
    <div>
      <h1>Minhas Tarefas</h1>
      <p>Bem-vindo(a), {currentUser.email}!</p>
      
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default Home;