import React, { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { useSubjects } from '../../hooks/useSubjects';
import './TaskForm.css'; // ✅ novo arquivo de estilo

function TaskForm() {
  const [taskText, setTaskText] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const { addTask } = useTasks();
  const { subjects } = useSubjects();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim() || !subjectId) {
      alert('Por favor, selecione uma matéria antes de adicionar a tarefa.');
      return;
    }
    addTask(taskText.trim(), subjectId);
    setTaskText('');
    setSubjectId('');
  };

  return (
    <form className="taskform" onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="O que precisa ser feito?"
        className="taskform__input"
      />

      <select
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
        className="taskform__select"
      >
        <option value="">Selecione uma matéria</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button type="submit" className="taskform__button">
        Adicionar
      </button>
    </form>
  );
}

export default TaskForm;
