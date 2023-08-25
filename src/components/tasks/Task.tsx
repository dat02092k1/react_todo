// components/Task.tsx
import React, { useState, useEffect } from 'react';
import {Task as TaskModel} from "../../model/Task.model";

interface TaskProps {
    task: TaskModel;
    onDelete: (id: string) => void;
    onEdit: (id: string, updatedTask: TaskModel) => void;
}

const Task: React.FC<TaskProps> = ({ task, onDelete, onEdit }) => {
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [status, setStatus] = useState(task.isCompleted);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = () => {
        onEdit(task.id, { ...task, title: editedTitle });
        setEditing(false);
    };

    // const setEditedStatus = (e: string) => {
    //     setEditedTitle(e);
    // }
    return (
        <div className="task">
            {editing ? (
                <>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <button onClick={handleSaveClick}>Save</button>
                </>
            ) : (
                <>
                    <h3>{task.title}</h3>

                    <div>
                        <div>
                            <label>
                                Completed:
                                <input
                                    type="checkbox"
                                    checked={status}
                                    onChange={(e) => setStatus(e.target.checked)}
                                />
                            </label>
                        </div>

                        <div className="task-action">
                            <button onClick={handleEditClick}>Edit</button>
                            <button onClick={() => onDelete(task.id)}>Delete</button>
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};

export default Task;
