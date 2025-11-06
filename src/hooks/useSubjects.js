import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import {
  collection,
  addDoc,
  deleteDoc,
  doc as firestoreDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
  getDocs
} from 'firebase/firestore';

import { useAuth } from '../context/AuthContext';

export const useSubjects = () => {
  const { currentUser } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSubjects([]);
    setLoading(true);

    if (!currentUser) {
      setLoading(false);
      return;
    }

    const subjectsColRef = collection(db, `users/${currentUser.uid}/subjects`);
    const q = query(subjectsColRef);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const subs = [];
        querySnapshot.forEach((snap) => {
          subs.push({ id: snap.id, ...snap.data() });
        });
        setSubjects(subs);
        setLoading(false);
      },
      (error) => {
        console.error('Erro ao escutar subjects:', error);
        setSubjects([]);
        setLoading(false);
      }
    );

    return () => {
      try {
        unsubscribe && unsubscribe();
      } catch (e) {
        console.warn('Erro ao limpar listener de subjects', e);
      }
    };
  }, [currentUser]);

  const addSubject = async (name) => {
    if (!currentUser || !name || !name.trim()) return;
    try {
      await addDoc(collection(db, `users/${currentUser.uid}/subjects`), {
        name: name.trim(),
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Erro ao adicionar matéria:', error);
    }
  };

const deleteSubject = async (id) => {
  if (!currentUser || !id) return;
  try {
    const userPath = `users/${currentUser.uid}`;

    const tasksQuery = query(
      collection(db, `${userPath}/tasks`),
      where('subjectId', '==', id)
    );
    const tasksSnapshot = await getDocs(tasksQuery);

    const deletePromises = tasksSnapshot.docs.map((docSnap) =>
      deleteDoc(firestoreDoc(db, `${userPath}/tasks`, docSnap.id))
    );
    await Promise.all(deletePromises);

    await deleteDoc(firestoreDoc(db, `${userPath}/subjects`, id));
  } catch (error) {
    console.error('Erro ao deletar matéria e tarefas associadas:', error);
  }
};


  const updateSubject = async (id, newName) => {
    if (!currentUser || !id || !newName || !newName.trim()) return;
    try {
      await updateDoc(firestoreDoc(db, `users/${currentUser.uid}/subjects`, id), {
        name: newName.trim()
      });
    } catch (error) {
      console.error('Erro ao atualizar matéria:', error);
    }
  };

  return { subjects, loading, addSubject, deleteSubject, updateSubject };
};
