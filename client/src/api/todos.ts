import {api} from "@/api/axios.config.ts";
import type {Todo} from "@/components/TodoItem.model.ts";

export const getTodos = async (): Promise<Todo[]> => {
    const {data} = await api.get<Todo[]>("/todos");
    return data;
}

export const addTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
    const {data} = await api.post<Todo>("/todos", todo);
    return data;
}

export const updateTodo = async (id: number, todo: Todo): Promise<Todo> => {
    const {data} = await api.put<Todo>(`/todos/${id}`, todo);
    return data;
}

export const deleteTodo = async (id: number): Promise<Todo> => {
    const {data} = await api.delete(`todos/${id}`);
    return data;
}