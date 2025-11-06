import React from 'react';
import { useTasks } from '../../hooks/useTasks';
import { useSubjects } from '../../hooks/useSubjects';
import TaskItem from './TaskItem';
import './TaskList.css'; // ✅ Importa o CSS moderno

function TaskList({ subjectId }) {
  const { tasks, loading } = useTasks(subjectId);
  const { subjects } = useSubjects();

  if (loading) return <div className="tasklist__loading">Carregando tarefas...</div>;
  if (tasks.length === 0) return <div className="tasklist__empty">Nenhuma tarefa encontrada.</div>;

  const subjectMap = subjects.reduce((acc, subj) => {
    acc[subj.id] = subj.name;
    return acc;
  }, {});

  const groupedTasks = tasks.reduce((groups, task) => {
    const key = task.subjectId || 'sem_materia';
    if (!groups[key]) groups[key] = [];
    groups[key].push(task);
    return groups;
  }, {});

  const orderedSubjects = [
    ...subjects.map((s) => s.id),
    ...(groupedTasks['sem_materia'] ? ['sem_materia'] : []),
  ];

  return (
    <div className="tasklist__container">
      {orderedSubjects.map((subjId) => {
        const subjectName =
          subjId === 'sem_materia' ? 'Sem matéria' : subjectMap[subjId];
        const subjectTasks = groupedTasks[subjId] || [];

        if (subjectTasks.length === 0) return null;

        return (
          <div key={subjId} className="tasklist__subject-card">
            <div className="tasklist__subject-header">
              <span className="tasklist__subject-icon">📘</span>
              <h3 className="tasklist__subject-title">{subjectName}</h3>
            </div>
            <ul className="tasklist__tasks">
              {subjectTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;
