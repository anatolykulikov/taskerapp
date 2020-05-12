import './TaskAddButton.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class TaskAddButton extends Component {

    render() {
        return(
            <>
                <div className="task__add_button">
                    <Link to="/app-task/dashboard/add/">
                        <span className="icon">+</span>
                        <span className="text">Задача</span>
                    </Link>
                </div>
            </>
        )
    }
}