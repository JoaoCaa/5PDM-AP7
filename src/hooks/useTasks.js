import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const useTasks = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Escuta as tarefas em tempo real
  useEffect(() => {
    if (!currentUser) {
      setTasks([]);
      setLoading(false);
      return;
    }

    // Cria uma consulta para a coleção 'tasks' do Firestore
    const q = query(collection(db, `users/${currentUser.uid}/tasks`));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksArray = [];
      querySnapshot.forEach((doc) => {
        tasksArray.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksArray);
      setLoading(false);
    }, (error) => {
        console.error("Erro ao buscar tarefas: ", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Função para adicionar nova tarefa
  const addTask = async (taskText) => {
    if (!currentUser) return;
    await addDoc(collection(db, `users/${currentUser.uid}/tasks`), {
      text: taskText,
      completed: false,
      createdAt: new Date()
    });
  };

  // Função para deletar tarefa
  const deleteTask = async (id) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, `users/${currentUser.uid}/tasks`, id));
  };

  return { tasks, loading, addTask, deleteTask };
};