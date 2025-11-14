import {Box, Button, Modal, TextareaAutosize} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";
import type {TodoCreateModalProps} from "@/components/TodoModal.model.ts";

export const TodoModal = ({open, onClose, onCreate}: TodoCreateModalProps) => {
    const [todoText, setTodoText] = useState("");

    function createTodoHandler() {
        onCreate({
            text: todoText,
            completed: false
        });

        setTodoText("");
        onClose()
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box className="relative max-w-96 top-1/2 left-1/2 -translate-1/2 bg-white rounded-md shadow-lg p-6">
                <CloseIcon
                    className="cursor-pointer w-7 h-7 p-1 absolute right-4 top-4 transition-colors hover:fill-slate-600"
                    onClick={onClose}
                />

                <div className="flex flex-col">
                    <h2 className="text-xl mb-4">Создать задачу</h2>
                    <TextareaAutosize
                        value={todoText}
                        className="mb-6 border border-gray-200 rounded py-1 px-2 resize-none h-10"
                        minRows={5}
                        placeholder="Опишите вашу задачу"
                        onChange={(e) => setTodoText(e.target.value)}
                    />

                    <Button variant="contained" onClick={createTodoHandler}>Создать</Button>
                </div>
            </Box>
        </Modal>
    )
}