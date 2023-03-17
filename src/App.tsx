import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";


type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    function removeTask(id: string,todoListId:string) {
        debugger
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todoListId]
        let newTasks = [task, ...tasks];
        tasksObj[todoListId] = newTasks
        setTasks({...tasksObj});
    }


    function changeStatus(taskId: string, isDone: boolean,todoListId:string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }

    }


    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todoList.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value;
            setTodoList([...todoList]);
        }
    }

    let todoList1 = v1();
    let todoList2 = v1();

    let [todoList, setTodoList] = useState<Array<TodoListType>>([
        {id: todoList1, title: 'What to learn', filter: 'active'},
        {id: todoList2, title: 'What to buy', filter: 'completed'},
    ]);


    let removeTodoList = (todoListId:string) => {
        let filteredTodoList = todoList.filter(tl => tl.id !== todoListId)
        setTodoList(filteredTodoList);
        delete tasksObj[todoListId];
        setTasks({...tasksObj});
    }

    let[tasksObj, setTasks] = useState({
        [todoList1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "html", isDone: true}],
        [todoList2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true}]
    });



    return (
        <div className="App">
            {
                todoList.map((tl) => {

                    let tasksForTodolist = tasksObj[tl.id];


                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                    }

                    return (<TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />)
                })
            }
        </div>
    );
}


export default App;
