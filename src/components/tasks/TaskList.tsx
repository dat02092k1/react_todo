// components/TaskList.tsx
import React from 'react';
import Task from './Task';
import { Task as TaskModel } from '../../model/Task.model';
interface TaskListProps {
    tasks: TaskModel[];
    onDelete: (id: string) => void;
    onEdit: (id: string, updatedTask: TaskModel) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    );
};

export default TaskList;
