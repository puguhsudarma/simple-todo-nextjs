import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { Todo } from '../../types/todo.model';
import { saveNameLogic } from './todoLogic';

const initialState = {
  user: {
    id: '',
    name: '',
  },
  todos: [] as Todo[],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    saveName(state, action: PayloadAction<{ id: string; name: string }>) {
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
    },
    getTodos(state, action: PayloadAction<{ todos: Todo[] }>) {
      state.todos = action.payload.todos;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE as any, (state, action) => {
      state = {
        ...state,
        ...action.payload,
      };
    });

    builder.addCase(saveNameLogic.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;
