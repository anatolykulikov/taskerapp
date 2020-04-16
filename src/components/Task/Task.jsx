import './Task.scss';

import React, { Component } from 'react';

import { connect } from 'react-redux';

import { handleTasks } from 'actions/tasks.js'


class unmountedTask extends Component {

    handle(id, actionTask) {
        const { handleTasks } = this.props;
        handleTasks(id, actionTask);
    }

    render() {      
        return(
            <div className="task">
                <h2 className="task-header">{this.props.title}</h2>
                <div>{this.props.description}</div>
                <div className="task-controls">
                    <button className="task-control-start" onClick={() => this.handle(this.props.id, 'planned')}>To Planned</button>
                    <button className="task-control-start" onClick={() => this.handle(this.props.id, 'work')}>To work</button>
                    <button className="task-control-start" onClick={() => this.handle(this.props.id, 'complete')}>Completed</button>
                    <button className="task-control-del" onClick={() => this.handle(this.props.id, 'delete')}>Delete</button>
                </div>
                <div className="task-bookmark">
                    <svg className="task-bookmark-svg" xmlns="http://www.w3.org/2000/svg" width="21pt" height="21pt" viewBox="0 0 21 21" version="1.1">
                        <path fill={this.props.badgeColor} d="M 4.375 3.5 L 4.375 19.25 L 10.5 16.625 L 16.625 19.25 L 16.625 3.5 C 16.625 2.539062 15.835938 1.75 14.875 1.75 L 6.125 1.75 C 5.164062 1.75 4.375 2.539062 4.375 3.5 Z M 4.375 3.5 "/>
                    </svg>
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
    }
}

export const Task = connect(mapStateToProps, mapDispatchToProps)(unmountedTask);