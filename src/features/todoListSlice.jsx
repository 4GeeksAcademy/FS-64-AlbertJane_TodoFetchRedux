import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    todoList: []
}

export const todoListSlice = createSlice({
    name:'todoList',
    initialState,
    reducers:{
        setTodoList:  (state, action) => {
            
            state.todoList = [...action.payload];
        },
        
        addTodo: (state,action) => {
             state.todoList.push(action.payload);
        },
        removeTodo: (state,action) => {
             state.todoList.splice(action.payload,1);
        }
    }
})

export const {setTodoList, getTodoList, addTodo,removeTodo} = todoListSlice.actions

export default todoListSlice.reducer