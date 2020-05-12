// Подключаем стили
import './Dashboard.scss';

// Подключаем библиотеки
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Подключаем экшены
import { load } from 'actions/tasks.js'

// Подключаем компоненты
import { Header } from 'components/Header';
import { TasksList } from 'components/TasksList';
import { TaskFull } from 'components/TaskFull';
import { TaskAddButton } from 'components/TaskAddButton';

// Класс компонента
class DashboardComponent extends Component {
    componentDidMount() {
        const { loadTasks } = this.props;
        const token = localStorage.getItem('_t');
        
        if(token) {
            loadTasks();
        }
    }
    
    render() {
        const { tasks, loading, selectedTask } = this.props;

        let plannedTasks = [];
        let workingTasks = [];
        let completeTasks = [];
        let viewTask = [];

        tasks.forEach((task) => {

            if(task.id == selectedTask) {
                viewTask = task;
            }

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

        const token = localStorage.getItem('_t');

        return(
            <>
                {!token && <Redirect to="/app-task/auth" />}
                <div className="dashboard">
                    <Header />
                    <section className="dashboard__body">
                        <TasksList name="Запланированы" loading={loading} tasks={plannedTasks} />
                        <TasksList name="В работе" loading={loading} tasks={workingTasks} />
                        <TasksList name="Завершены" loading={loading} tasks={completeTasks} />
                        {selectedTask !== -1 && <TaskFull {...viewTask} />}
                    </section>
                    <TaskAddButton />
                </div>
            </>
        )
    }
}

// Данные в компонент
const mapStateToProps = (state, props) => {
    return {
        tasks: state.tasks.data,
        loading: state.tasks.loading,
        selectedTask: state.tasks.selectedTask
    }
}

// Данные из компонента
const mapDispatchToProps = (dispatch, props) => {
    return {
        loadTasks: () => load(dispatch),
    }
}

// Монтируем компонент
export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);