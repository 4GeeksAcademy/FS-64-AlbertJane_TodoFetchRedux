import {EventEmiter} from 'events';
import dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';
import { callbackify } from 'util';


const CHANGE_EVENT = 'change';
let tasks = [];

class TodoStore extends EventEmiter {

    constructor() {
        super();
        this.todos = [];

    }   

    getAllTodos() {
        return this.todos;
    }

    addTodo(label){
        
        this.todos = [...this.todos, {label,is_done:false}];
    }

}