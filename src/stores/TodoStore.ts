import { TodoDto } from '../types/todo';
import {create} from "zustand/react";

interface TodoState {
    todos: TodoDto[];
    showArchived: boolean;
    setTodos: (todos: TodoDto[]) => void;
    addTodo: (todo: TodoDto) => void;
    deleteTodo: (id: number) => void;
    archiveTodo: (id: number) => void;
    restoreTodo: (id: number) => void;
    toggleShowArchived: () => void;
}

export const useTodoStore = create<TodoState>((set) => ({
    todos: [],
    showArchived: false,
    setTodos: (todos) => set({ todos }),
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    deleteTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
    archiveTodo: (id) => set((state) => ({
        todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, archived: true } : todo
        ),
    })),
    restoreTodo: (id) => set((state) => ({
        todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, archived: false } : todo
        ),
    })),
    toggleShowArchived: () => set((state) => ({ showArchived: !state.showArchived })),
}));
