import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;
import {FilterValuesType} from "./App";
import error = Simulate.error;


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string,todoListId:string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string,todoListId:string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,todoListId:string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId:string) => void
}

export function TodoList(props: PropsType) {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask()
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(),props.id);
            setTitle("");
        }else{
            setError("Title is required")
        }
    }


    const onAllClickHandler = () => props.changeFilter("all",props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }


    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>x</button></h3>
            <div>
                <input value={title} onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className= { error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                { error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                            const onRemoveHandler = () => props.removeTask(t.id,props.id)
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked,props.id)
                            }
                            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       onChange={onChangeHandler}
                                       checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x
                                </button>
                            </li>
                        }
                    )
                }
            </ul>
            <div>
                <button className={ props.filter === 'all' ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All</button>
                <button  className={ props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</button>
                <button  className={ props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}