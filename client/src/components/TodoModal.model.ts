import type {Todo} from "@/components/TodoItem.model.ts";

export type TodoCreateModalProps = {
    open: boolean;
    onClose: () => void;
    onCreate: (todo: Omit<Todo, "id">) => void;
}