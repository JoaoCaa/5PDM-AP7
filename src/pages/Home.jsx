import React, { useState } from 'react';
import TaskForm from '../components/Task/TaskForm';
import TaskList from '../components/Task/TaskList';
import SubjectManager from '../components/Subjects/SubjectManager';
import { useAuth } from '../context/AuthContext';
import { useSubjects } from '../hooks/useSubjects';
import './Home.css'; // ✅ CSS separado

function Home() {
  const { currentUser } = useAuth();
  const { subjects } = useSubjects();
  const [selectedSubject, setSelectedSubject] = useState('');

  return (
    <div className="home">
      <div className="home__header">
        <h1 className="home__title">Minhas Tarefas</h1>
        <p className="home__welcome">Bem-vindo(a), {currentUser.email}!</p>
      </div>

      <div className="home__section">
        <SubjectManager />
      </div>

      <div className="home__filter">
        <label htmlFor="subject-filter">Filtrar por matéria:</label>
        <select
          id="subject-filter"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">Todas</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <TaskForm />
      <TaskList subjectId={selectedSubject} />
    </div>
  );
}

export default Home;
