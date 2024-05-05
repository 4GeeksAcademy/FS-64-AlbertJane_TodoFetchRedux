import { useSelector, useDispatch } from "react-redux";
import { setTodoList } from "./todoListSlice";
import { Todo } from "../components/Todo";
import { useEffect,useState } from "react";
import './TodoList.css'
export const TodoList = () => {
    const [taskToAdd,setTaskToAdd] = useState('')
  const todoList = useSelector((state) => state.todoList.todoList);
  const dispatch = useDispatch();
  const setActionTodoList = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/albert_jane",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setTodoList(data.todos));
    } catch (error) {
      alert("algo ha fallado, porfavor recarga la página");
    }
  };

  const handleRemoveTask = async (id) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(response.ok) {
        setActionTodoList();
        return;
    }
        alert('algo ha fallado')
    } catch (error) {
      alert("algo ha fallado, porfavor recarga la página");
    }
  };
  const handleAddTask = async () => {
    const response = await fetch('https://playground.4geeks.com/todo/todos/albert_jane',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({label:taskToAdd,is_done:false})
    })
        if(response.ok){
        setActionTodoList();
        return;
        }
        alert("algo ha ido mal");
  }
  const handleMarkAsDone = async (id) => {
    console.log(id);
    const isTaskDone = todoList.find(todo => todo.id === id);
    const is_done = !isTaskDone.is_done
    try {
        const response = await fetch(
          `https://playground.4geeks.com/todo/todos/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({is_done})
                
            
          }
        );
        if(response.ok) {
          setActionTodoList();
          return;
      }
          alert('algo ha fallado')
      } catch (error) {
        alert("algo ha fallado, porfavor recarga la página");
      }
  }
  useEffect(() => {
    setActionTodoList();
  }, []);

  const todos = todoList.map((element, index) => {
    console.log(element);
    return (
      <>
        <Todo
          key={index}
          id={element.id}
          removeTask={handleRemoveTask}
          markAsDone={handleMarkAsDone}
          label={element.label}
          isDone={element.is_done}
        />
      </>
    );
  });
  return (
    <>
      <div className="app__container">
        <div className="container">
          <div className="inputs">
            <input placeholder='Add a Task...' id="addtodo" type="text" name="" value={taskToAdd} onChange={e=> setTaskToAdd(e.target.value)} />
            <button onClick={()=> handleAddTask()}>Add task</button>
          </div>

          <div className="todos__container">{todos}</div>
        </div>
      </div>
    </>
  );
};
