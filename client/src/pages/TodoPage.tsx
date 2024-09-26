import Form from "../components/todo/form";
import TodoList from "../components/todo/todoList";

function TodoPage() {
  return (
    <div className="w-full">
      <Form />
      <div className="mt-3">
        <TodoList />
      </div>
    </div>
  );
}

export default TodoPage;
