import {useEffect, useState} from "react";
import {addTodo, deleteTodo, getTodos, updateTodo} from "@/api/todos.ts";
import type {Todo} from "@/components/TodoItem.model.ts";

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        getTodos()
            .then(setTodos)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [])

    async function addTodoHandler(todo: Omit<Todo, "id">) {
        try {
            const newTodo = await addTodo(todo);
            setTodos(prev => [...prev, newTodo]);
        } catch (e) {
            console.error("Ошибка добавления todo:", (e as Error).message);
        }
    }

    async function updateTodoHandler(id: number, todoFields: Partial<Todo>) {
        const currentTodo = todos.find(t => t.id === id);
        if (!currentTodo) {
            console.error("Не удалось обновить данные todo")
            return;
        }

        try {
            const updatedTodo = await updateTodo(id, {...currentTodo, ...todoFields});
            setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t));
        } catch (e) {
            console.error("Ошибка обновления todo: ", (e as Error).message);
        }
    }

    async function deleteTodoHandler(id: number) {
        try {
            const deletedTodo = await deleteTodo(id);
            setTodos(prev => prev.filter(t => t.id !== deletedTodo.id));
        } catch (e) {
            console.error("Ошибка удаления todo:", (e as Error).message);
        }
    }

    return {
        todos,
        error,
        loading,
        setTodos,
        setError,
        setLoading,
        updateTodoHandler,
        deleteTodoHandler,
        addTodoHandler,
    };
}