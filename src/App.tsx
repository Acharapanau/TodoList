import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";


function App() {




    let [tasks,setTasks] = useState([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "html", isDone: true}
]);

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    return (
        <div className="App">
            <TodoList title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
            />
        </div>
    );
}


export default App;
