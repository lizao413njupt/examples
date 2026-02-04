/*
  1. Implement adding and deleting todo items.
  2. Implement completing todo items (completed items should be moved to the bottom).
*/

function MyApp() {
  const [todoList, setTodoList] = React.useState([]);
  const [currentTodo, setCurrentTodo] = React.useState("");

  function handleAddTodo() {
    if(!currentTodo.trim().length) {
      alert("请输入一个待办事项")
    }
    const newTodoList = [
      ...todoList,
      {content:currentTodo}
    ]
    setTodoList(newTodoList)
    setCurrentTodo("")
  }

  function handleDeleteTodo(id) {
    // 筛选掉所有和传入id相同的
    const deletedTodoList =  todoList.filter((todo, idx) => idx !== id)
    // 每次修改过后都要记得调用set方法更新，不然没用
    setTodoList(deletedTodoList)
  }

  return (
    <main>
      <h1>React Todo List</h1>
      <input 
        type="text" 
        placeholder="Add item into as todo"
        value={currentTodo}
        onChange={(item) => setCurrentTodo(item.target.value)} 
      />
      <button
        onClick={handleAddTodo}
      >Add</button>
      <ul>
        {/* map函数可以同时获取两个参数，第一个是item,第二个是参数index */}
        {todoList.length > 0 && todoList.map((todo, idx) =>(
          <li className="deleted">
            <input type="checkbox" />
            {todo.content}
            <button
              onClick={() => handleDeleteTodo(idx)}
            >delete</button>
          </li>
      ))}
        
      </ul>
    </main>
  );
}

const appEl = document.querySelector("#app");
const root = ReactDOM.createRoot(appEl);

root.render(<MyApp />);