import {TodoItem} from "@/components/TodoItem.tsx";
import {useTodos} from "@/hooks/useTodos.ts";
import {Button} from "@mui/material";
import {useState} from "react";
import {TodoModal} from "@/components/TodoModal.tsx";

export const TodoList = () => {
    const {todos, error, loading, updateTodoHandler, deleteTodoHandler, addTodoHandler} = useTodos()

    const [openModal, setOpenModal] = useState<boolean>(false)

    return (
        <div className="flex flex-col items-center w-full">
            <div className="mb-4">
                <Button variant="contained" onClick={() => setOpenModal(true)}>Добавить задачу</Button>
            </div>

            <div className="max-w-2xl w-full border rounded-xs px-1 py-2 border-gray-200">
                {
                    loading ? <div>Загрузка...</div>
                        : error ? <div>Ошибка загрузки</div>
                            : todos.length === 0 ? <div>Задач нет</div>
                                : (
                                    <ul className="w-full flex flex-col gap-2">
                                        {todos.reverse().map((item, index) =>
                                            <li key={item.id}>
                                                <TodoItem
                                                    orderIndex={index + 1}
                                                    todo={item}
                                                    onChange={(id, todoFields) => updateTodoHandler(id, todoFields)}
                                                    onDelete={(id) => deleteTodoHandler(id)}
                                                />
                                            </li>
                                        )}
                                    </ul>
                                )
                }
            </div>

            <TodoModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onCreate={addTodoHandler}
            />
        </div>
    )
}