import {TodoList} from "@/components/TodoList.tsx";

function App() {

    return (
        <section className="py-10">
            <div className="container px-8 mx-auto">
                <div className="w-full">
                    <TodoList/>
                </div>
            </div>
        </section>
    )
}

export default App
