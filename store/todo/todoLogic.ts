import { createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'firebase';
import { TODOS, USERS } from '../../constants/path';
import { Todo, TodoBody } from '../../types/todo.model';
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
          return {
            ...todo.data(),
            id: todo.id,
          } as Todo;
        });
        thunkAPi.dispatch(todoActions.getTodos({ todos }));
      });

    unsubscribe(todosSnapshot);
  }
);

export const uploadImageToFirebaseStorage = async (image: File) => {
  try {
    const ref = `/${TODOS}/${image.name}`;
    const storage = firebase.storage();

    const uploadTask = await storage.ref(ref).put(image);

    const downloadUrl = await uploadTask.ref.getDownloadURL();

    return downloadUrl as string;
  } catch (error) {
    alert(error.message);
    return 'https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/02/15/1844222189.jpg';
  }
};

export const createTodoLogic = createAsyncThunk('todo/createTodo', async (props: TodoBody) => {
  let imageUrl = 'https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/02/15/1844222189.jpg';

  if (props.image) {
    imageUrl = await uploadImageToFirebaseStorage(props.image);
  }

  const { id } = await firebase.firestore().collection(TODOS).add({
    title: props.title,
    description: props.description,
    image: imageUrl,
    user_id: props.userId,
    user_name: props.userName,
    done: false,
    created_date: firebase.firestore.FieldValue.serverTimestamp(),
  });

  return {
    ...props,
    id,
    image: imageUrl,
  };
});

export const markAsDoneLogic = createAsyncThunk('todo/markAsDone', async (todoId: string) => {
  const firestore = firebase.firestore();
  return firestore.collection(TODOS).doc(todoId).update({ done: true });
});

export const deleteTodoLogic = createAsyncThunk('todo/deleteTodo', async (todoId: string) => {
  const firestore = firebase.firestore();
  return firestore.collection(TODOS).doc(todoId).delete();
});

export const updateTodoLogic = createAsyncThunk(
  'todo/updateTodo',
  async (props: Pick<TodoBody, 'title' | 'description' | 'image' | 'id'>) => {
    const data: any = {
      title: props.title,
      description: props.description,
      updated_date: firebase.firestore.FieldValue.serverTimestamp(),
    };

    if (props.image) {
      data.image = await uploadImageToFirebaseStorage(props.image);
    }

    return firebase.firestore().collection(TODOS).doc(props.id).update(data);
  }
);
