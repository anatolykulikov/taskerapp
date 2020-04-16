import './Dashboard.scss';

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { load } from 'actions/tasks.js'

import { TasksList } from 'components/TasksList';

class DashboardComponent extends Component {
    
    componentDidMount() {
        const { loadTasks } = this.props;
        loadTasks();
    }
    
    render() {
        const { tasks, loading } = this.props;

        let plannedTasks = [];
        let workingTasks = [];
        let completeTasks = [];
        tasks.forEach((task) => {
            switch(task.status) {
                case 'planned' : {
                    plannedTasks.push(task);
                    break;
                }
                case 'work' : {
                    workingTasks.push(task);
                    break;
                }
                case 'complete' : {
                    completeTasks.push(task);
                    break;
                }
            }
        })

        return(
            <div className="dashboard">
                <header className="dashboard__header">
                    <h1>TaskApp</h1>
                </header>
                <section className="dashboard__body">
                    <TasksList name="Planned" loading={loading} tasks={plannedTasks} />
                    <TasksList name="In Work" loading={loading} tasks={workingTasks} />
                    <TasksList name="Completed" loading={loading} tasks={completeTasks} />
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        tasks: state.tasks.data,
        loading: state.tasks.loading
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadTasks: () => load(dispatch),
    }
}

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);