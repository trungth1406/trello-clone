import Task from "./Task";
import {useState} from "react";
import AddTaskForm from "./AddTaskForm";

export default function TaskList({cardDetail}) {

    const [tasks, setTasks] = useState(cardDetail.items || []);
    const addNewTask = (taskName) => {
        setTasks(last => [...last, {
            id: Math.random(),
            name: taskName,
        }]);
    }
    const updateTasks = (item, newName) => {
        setTasks(prevTasks => {
            return prevTasks.map((task) => {
                if (task === item) {
                    task.name = newName;
                }
                return task;
            });
        });
    }

    const deleteTask = (item) => {
        setTasks(prevTasks => prevTasks.filter(task => task !== item));
    }

    return (
        <>
            <ul className='card-item-list'>
                {tasks.map((task, _) =>
                    <Task
                        key={'taskNo' + task.id}
                        taskItem={task}
                        updateTasks={updateTasks}
                        deleteTask={deleteTask}
                    />)}
            </ul>
            {cardDetail.name && (<>
                <AddTaskForm addNewTask={addNewTask}/>
            </>)}
        </>
    )
}
