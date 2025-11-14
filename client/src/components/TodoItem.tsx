import type {TodoItemProps} from "@/components/TodoItem.model.ts";
import {Checkbox, TextareaAutosize} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import {useEffect, useState} from "react";

export const TodoItem = ({orderIndex, todo, onChange, onDelete}: TodoItemProps) => {
    // TODO: добавить функции добавления, редактирования, удаления todo
    const [editMode, setEditMode] = useState<boolean>(false);
    const [todoEditText, setTodoEditText] = useState<string>(todo.text);

    function editHandler() {
        if (editMode) {
            onChange(todo.id, {text: todoEditText})
            setEditMode(false)
        } else {
            setEditMode(true);
        }
    }

    useEffect(() => {
        setTodoEditText(todo.text)
    }, [todo.text])

    return (
        <>
            <div className="flex gap-4 items-start px-5 py-3 border border-gray-200 rounded-xs">
                <div className="flex gap-2 mr-auto w-full flex-1">
                    <span>{orderIndex}.</span>

                    {
                        editMode
                            ? <TextareaAutosize
                                value={todoEditText}
                                className="w-full resize-none border border-gray-200 rounded"
                                minRows={2}
                                onChange={(e) => setTodoEditText(e.target.value)}
                            />
                            : <p>{todo.text}</p>
                    }
                </div>
                <div>
                    <Checkbox
                        checked={todo.completed}
                        onChange={(e) => onChange(todo.id, {completed: e.target.checked})}
                    />

                    {
                        editMode
                            ? <DoneIcon className="cursor-pointer text-blue-600 hover:text-blue-400"
                                        onClick={() => editHandler()}/>
                            : <EditIcon className="cursor-pointer text-blue-600 hover:text-blue-400"
                                        onClick={() => editHandler()}/>
                    }
                    <DeleteIcon className="cursor-pointer text-blue-600 hover:text-blue-400"
                                onClick={() => onDelete(todo.id)}/>
                </div>
            </div>
        </>
    )
}