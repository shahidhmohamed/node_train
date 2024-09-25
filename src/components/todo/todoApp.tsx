import Form from "./form";
import TodoList from "./todoList";

function TodoPage() {
  return (
    <div className="w-full">
      {/* Render the Todo Form */}
      <Form />

      {/* Render the Todo List */}
      <div className="mt-3">
        <TodoList />
      </div>
    </div>
  );
}

export default TodoPage;
