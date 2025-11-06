import React, { useState } from 'react';
import { useSubjects } from '../../hooks/useSubjects';
import './SubjectManager.css'; // ✅ novo CSS

function SubjectManager() {
  const [newSubject, setNewSubject] = useState('');
  const { subjects, loading, addSubject, deleteSubject } = useSubjects();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newSubject.trim()) return;
    addSubject(newSubject);
    setNewSubject('');
  };

  if (loading) return <p>Carregando matérias...</p>;

  return (
    <div className="subjects">
      <h2 className="subjects__title">📘 Minhas Matérias</h2>

      <form onSubmit={handleSubmit} className="subjects__form">
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Nova matéria"
          className="subjects__input"
        />
        <button type="submit" className="subjects__add">
          Adicionar
        </button>
      </form>

      <ul className="subjects__list">
        {subjects.map((subj) => (
          <li key={subj.id} className="subjects__item">
            <span>{subj.name}</span>
            <button
              onClick={() => deleteSubject(subj.id)}
              className="subjects__delete"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubjectManager;
