import RouterFunction, {type Router, type Request, type Response} from "express";
import {v4 as uuidv4} from "uuid";
import {logger} from "../libs/logger.ts";

const router: Router = RouterFunction();

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

let todos: Todo[] = [
    {id: "0", text: "string 1", completed: true},
    {id: "1", text: "string 2", completed: true},
    {id: "2", text: "string 3", completed: true},
]

/* -------------- Routes -------------- */

// GET /api/todos - Получить все задачи
router.get("/", (req: Request, res: Response) => {
    res.status(200).json(todos)
})

// GET /api/todos/:id - Получить задачу по id
router.get("/:id", (req: Request, res: Response) => {
    const todo = todos.filter(t => t.id === req.params.id);

    todo
        ? res.status(200).json(todo)
        : res.status(404).send("Задача не найдена");
})

// POST /api/todos - Создать новую задачу
router.post("/", (req: Request, res: Response) => {
    logger.group.text(req.method)
    logger.info(req.method, ">>>", req.body)

    const {text} = req.body;

    if (!text) {
        logger.error('400: Требуется текст задачи')
        return res.status(400).send("Требуется текст задачи")
    }

    const lastId = todos[todos.length - 1]
        ? Number(todos[todos.length - 1]?.id) + 1
        : 0

    const newTodo = {
        id: String(lastId),
        text,
        completed: false
    }

    todos.push(newTodo);
    res.status(201).json(newTodo);

    logger.success(newTodo)
    console.groupEnd()
})

// PUT /api/todos/:id - Обновить задачу
router.put("/:id", (req: Request, res: Response) => {
    logger.group.text(req.method)
    logger.info(req.method, req.params.id, '>>>', req.body)

    const {text, completed} = req.body;
    const todo = todos.find(t => t.id === String(req.params.id))

    if (!todo) {
        logger.error('404: Не найдено todo:', req.body, '; Найдено:', todo)
        return res.status(404).send("Задача не найдена")
    }
    if (text !== undefined) todo.text = text;
    if (completed !== undefined) todo.completed = completed;

    res.status(200).send(todo)

    logger.success(todo)
    console.groupEnd()
})

// DELETE /api/todos/:id - Удалить задачу
router.delete("/:id", (req: Request, res: Response) => {
    logger.group.text(req.method)
    logger.info(req.method, req.params.id, 'XXX')

    const index = todos.findIndex(t => t.id === String(req.params.id))

    if (index === -1) {
        logger.error("404: Не найдено todo:", req.params.id)
        return res.status(404).send("Задача не найдена")
    }

    const deletedTodos = todos.splice(index, 1);
    res.status(200).send(deletedTodos[0])

    logger.success("Удален todo с id:", req.params.id)
    console.groupEnd()
})

export default router;