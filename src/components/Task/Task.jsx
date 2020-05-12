import './Task.scss';

import React, { Component } from 'react';

import { connect } from 'react-redux';

import { handleTasks, viewTask } from 'actions/tasks.js'


class unmountedTask extends Component {
    
    // Обработка задачи
    handle(id, actionTask) {
        const { handleTasks } = this.props;
        handleTasks(id, actionTask);
    }

    // Отображение задачи
    view() {
        const { viewTask } = this.props;
        viewTask(this.props.id)
    }

    render() {      
        return(
            <div className="task">
                <div onClick={() => this.view()}>
                    <h2 className="task-header">{this.props.title}</h2>
                    <div className="task-bookmark">
                        <svg className="task-bookmark-svg" xmlns="http://www.w3.org/2000/svg" width="21pt" height="21pt" viewBox="0 0 21 21" version="1.1">
                            <path fill={this.props.badgeColor} d="M 4.375 3.5 L 4.375 19.25 L 10.5 16.625 L 16.625 19.25 L 16.625 3.5 C 16.625 2.539062 15.835938 1.75 14.875 1.75 L 6.125 1.75 C 5.164062 1.75 4.375 2.539062 4.375 3.5 Z M 4.375 3.5 "/>
                        </svg>
                    </div>
                </div>
                <div className="task-controls">
                    {this.props.status !== 'planned' && this.props.status !== 'complete' && <button className="task-control control-run" onClick={() => this.handle(this.props.id, 'planned')}>В план</button>}
                    {this.props.status !== 'work' && <button className="task-control control-run" onClick={() => this.handle(this.props.id, 'work')}>В работу</button>}
                    {this.props.status !== 'complete' && this.props.status !== 'planned' && <button className="task-control control-run" onClick={() => this.handle(this.props.id, 'complete')}>Завершить</button>}
                    <button className="task-control control-del" onClick={() => this.handle(this.props.id, 'delete')}>Удалить</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        state,
        props
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        handleTasks: (id, actionTask) => dispatch(handleTasks(id, actionTask)),
        viewTask: (id) => dispatch(viewTask(id))
    }
}

export const Task = connect(mapStateToProps, mapDispatchToProps)(unmountedTask);