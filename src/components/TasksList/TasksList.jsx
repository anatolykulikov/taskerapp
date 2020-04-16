import './TasksList.scss';

import React from 'react';
import { Task } from 'components/Task';
import { Loading } from 'components/Loading';


export function TasksList(props) {
    const loading = props.loading;
    const tasksItems = props.tasks.map((task) => {
        return <Task key={task.id} id={task.id} title={task.title} badgeColor={task.badgeColor} />;
    })

    return(
        <div className="taskslist">
            <h2 className="taskslist__header">{props.name}</h2>
            {!loading && tasksItems}
            {loading && <Loading />}
        </div>
    );
}