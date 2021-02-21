import { newStore } from '../store';
import rootReducer from '../store/reducers';

export interface Todo {
  id: string;
  created_date: { nanoseconds: number; seconds: number };
  title: string;
  description: string;
  done: boolean;
  image: string;
  user_id: string;
  user_name: string;
}

export interface User {
  name: string;
}

export type AppDispatch = ReturnType<typeof newStore>['dispatch'];

export interface AppState extends ReturnType<typeof rootReducer> {}
