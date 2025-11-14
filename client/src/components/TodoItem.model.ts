export type Todo = {
    id: number;
    text: string;
    completed: boolean;
}

export type TodoItemProps = {
    orderIndex: number;
    todo: Todo;
    onChange: (id: number, todoFields: Partial<Todo>) => void;
    onDelete: (id: number) => void;
}