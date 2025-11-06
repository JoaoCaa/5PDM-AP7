import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const useTasks = (subjectId = null) => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setTasks([]);
      setLoading(false);
      return;
    }

    // monta query filtrando por matéria (se fornecida)
    const baseRef = collection(db, `users/${currentUser.uid}/tasks`);
    const q = subjectId
      ? query(baseRef, where('subjectId', '==', subjectId))
      : query(baseRef);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const tasksArray = [];
        querySnapshot.forEach((snap) => {
          tasksArray.push({ id: snap.id, ...snap.data() });
        });
        setTasks(tasksArray);
        setLoading(false);
      },
      (error) => {
        console.error('Erro ao buscar tarefas: ', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser, subjectId]);

  const addTask = async (taskText, subjectId) => {
    if (!currentUser) return;
    await addDoc(collection(db, `users/${currentUser.uid}/tasks`), {
      text: taskText,
      subjectId: subjectId || null,
      completed: false,
      createdAt: new Date(),
    });
  };

  const deleteTask = async (id) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, `users/${currentUser.uid}/tasks`, id));
  };

  return { tasks, loading, addTask, deleteTask };
};
