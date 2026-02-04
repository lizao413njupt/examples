/*
  1. Implement adding and deleting todo items.
  2. Implement completing todo items (completed items should be moved to the bottom).
*/

function MyApp() {
  const [todoList, setTodoList] = React.useState([]);
  const [currentTodo, setCurrentTodo] = React.useState("");

  // 添加todo
  function handleAddTodo() {
    if(!currentTodo.trim().length) {
      alert("请输入一个待办事项")
    }
    const newTodoList = [
      ...todoList,
      {
        content:currentTodo,
        isCompleted:false
      }
    ]
    setTodoList(newTodoList)
    setCurrentTodo("")
  }

  // 删除todo
  function handleDeleteTodo(id) {
    // 筛选掉所有和传入id相同的
    const deletedTodoList =  todoList.filter((todo, idx) => idx !== id)
    // 每次修改过后都要记得调用set方法更新，不然没用
    setTodoList(deletedTodoList)
  }
  // 对isCompleted的值进行一个翻转
  function toggleTodo(id) {
    const toggledTodoList = todoList.map((todo, idx) => {
      /* 如果找到了那个要修改的值，那么我们需要返回一个对象，
      内容是用之前的todo的isCompleted取反，再将其覆盖再原来
      的todo上
      */
      if(idx === id) {
        
        return {
          ...todo,
          isCompleted:!todo.isCompleted
        }
      }
      // 虽然不太可能找不到，但是还是返回一下原值
      return todo
    })
    /* 我们要求没有toggle的放在toggle的前面，因此每次做完toggle的操作
    需要就这一要求进行排序
    */
    sortTodoList()
  }

  function sortTodoList(todoList) {
    const sortedTodoList = todoList.sort((o1, o2) => {
      if(o1.isCompleted !== o2.isCompleted) {
        // 返回1代表o1在后边，-1代表前边
        return o1.isCompleted?1:-1
      }
      // 都不是的话返回0
      return 0

    })
    setTodoList(sortedTodoList)
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
          // 对className进行一个简单的判断
          <li className={todo.isCompleted?"deleted":""}>
            <input 
              type="checkbox" 
              // 必须要把函数调用切换为匿名函数，不能写成toggleTodo(idx)的形式
              onClick={() => toggleTodo(idx)}  
            />
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