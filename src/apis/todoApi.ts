import api from './api';
import {TodoCreateRequestDto, TodoDto} from "../types/todo.ts";

// 전체 Todo 조회
export const getTodos = async (): Promise<TodoDto[]> => {
    const response = await api.get('/api/todos');
    return response.data;
};

// 특정 Todo 상세 조회
export const getTodoDetail = async (id: number): Promise<TodoDto> => {
    const response = await api.get(`/api/todos/${id}`);
    return response.data;
};

// Todo 생성
export const createTodo = async (
    title: string,
    description: string,
    tagIds: number[]
): Promise<TodoDto> => {
    const response = await api.post('/api/todos', { title, description, tagIds } as TodoCreateRequestDto);
    return response.data;
};

// Todo 수정
export const updateTodo = async (
    id: number,
    title: string,
    description: string,
    tagIds: number[]
): Promise<TodoDto> => {
    const response = await api.put(`/api/todos/${id}?tagIds=${tagIds.join(',')}`, {
        title,
        description
    });
    return response.data;
};

// Todo 삭제
export const deleteTodo = async (id: number): Promise<void> => {
    const response = await api.delete(`/api/todos/${id}`);
    return response.data;
};

// Todo 완료 처리
export const markTodoAsCompleted = async (id: number): Promise<void> => {
    const response = await api.patch(`/api/todos/${id}/completed`);
    return response.data;
};

// Todo 아카이브 처리
export const archiveTodo = async (id: number): Promise<void> => {
    const response = await api.patch(`/api/todos/${id}/archive`);
    return response.data;
};
