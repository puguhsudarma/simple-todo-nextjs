import { createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'firebase';
import { TODOS, USERS } from '../../constants/path';
import { Todo } from '../../types/todo.model';
import { todoActions } from './todoSlice';

export const saveNameLogic = createAsyncThunk('todos/saveName', async (props: { name: string }) => {
  const { id } = await firebase.firestore().collection(USERS).add({ name: props.name });
  localStorage.setItem('uid', id);
  localStorage.setItem('name', props.name);

  return { id, name: props.name };
});

export const getTodosLogic = createAsyncThunk(
  'todo/getTodos',
  (unsubscribe: (ref: any) => void, thunkAPi) => {
    const todosSnapshot = firebase
      .firestore()
      .collection(TODOS)
      .onSnapshot((snapshot) => {
        const todos = snapshot.docs.map((todo) => {
          return { ...todo.data(), id: todo.id } as Todo;
        });
        thunkAPi.dispatch(todoActions.getTodos({ todos }));
      });

    unsubscribe(todosSnapshot);
  }
);
