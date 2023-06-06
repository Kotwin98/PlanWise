import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface TodoState {
  value: string[];
}

const initialState: TodoState = {
  value: ['my first todo']
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload)
    },
    removeTodo: (state) => {
      state.value.slice(0, -1)
    }
  }
})

export const { addTodo, removeTodo } = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo.value;

export default todoSlice.reducer;