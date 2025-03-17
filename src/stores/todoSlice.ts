import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/stores/index.ts";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ISingleTodo } from "@/types";
import { request } from "@/helpers/axios.ts";

interface TodoState {
  todos: ISingleTodo[];
  isLoading?: boolean;
  error?: string;
}

const initialState: TodoState = {
  todos: [],
  isLoading: false,
};

export const TODO_KEY = "TODO_KEY";
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  return new Promise<ISingleTodo[]>((resolve) => {
    setTimeout(async () => {
      const response = await request.get("/todos", { params: { _limit: 5 } });
      resolve(response.data);
      // to illustrate loading UI
    }, 1500);
  });
});

const todoSlice = createSlice({
  name: TODO_KEY,
  initialState,
  reducers: {
    markComplete: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    addTodo: (state, action: PayloadAction<string>) => {
      const title = action.payload;
      if (!title || title.trim() === "") {
        state.error = "Title is required";
        return;
      }
      if (state.todos.find((todo) => todo.title === title)) {
        state.error = "Title already exists";
        return;
      }
      const newTodo: ISingleTodo = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      };
      state.error = undefined;
      state.todos.push(newTodo);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchTodos.fulfilled,
      (state, action: PayloadAction<ISingleTodo[]>) => {
        state.todos = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(fetchTodos.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { markComplete, deleteTodo, addTodo } = todoSlice.actions;
export const selectTodos = (state: RootState) => state.todos.todos;
export default persistReducer({ key: TODO_KEY, storage }, todoSlice.reducer);
