import './AddTask.scss';

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { createTask } from 'actions/tasks.js'

class UnmountedAddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'planned',
            title: '',
            description: '',
            badgeColor: '#f7f7f7',
            timeStart: '',
            timeEnd: '',
            add: false
        }

        this.taskTitle = this.taskTitle.bind(this);
        this.taskDesc = this.taskDesc.bind(this);
        this.taskBadge = this.taskBadge.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    taskTitle(event) {
        this.setState({title: event.target.value});
    }
    taskDesc(event) {
        this.setState({description: event.target.value});
    }
    taskBadge(event) {
        this.setState({badgeColor: event.target.value});
    }

    randomID() {
        let randomNameID = '';
        const lib = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
        for(let i = 0; i < 5; i++) {
            let randomItem = Math.floor(Math.random() * lib.length);
            randomNameID += lib[randomItem];
        }
    
        let date = new Date();
        let randomID = randomNameID + '' + date.getMinutes() + '' + date.getMilliseconds();
        return randomID;
    }

    addTask() {
        const { createTask } = this.props;

        let newTask = {
            id: this.randomID,
            status: "planned",
            title: this.state.title,
            description: this.state.description,
            badgeColor: this.state.badgeColor,
            timeStart: "",
            timeEnd: ""
        }

        createTask(newTask);

        console.log(newTask);

        this.setState({add: true});
    }

    render() {

        return(
            <>
                {this.state.add == true && <Redirect to="/app-task/dashboard/" />}
                <div className="addtask__page">
                    <div className="addtask">
                        <h1>Добавить задачу</h1>
                        <label className="addtask_point">
                            <span>Название задачи</span>
                            <input type="text" placeholder="Название задачи" value={this.state.title} onChange={this.taskTitle}/>
                        </label>
                        <label className="addtask_point">
                            <span>Описание</span>
                            <textarea placeholder="Описание задачи" value={this.state.description} onChange={this.taskDesc}></textarea>
                        </label>
                        <label className="addtask_point">
                            <span>Цвет задачи</span>
                            <input type="color" value={this.state.badgeColor} onChange={this.taskBadge}/>
                        </label>
                        {this.state.title !== '' && this.state.description !== '' && <div>
                            <button onClick={this.addTask}>Создать задачу</button>
                        </div>}
                    </div>
                </div>
            </>
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
        createTask: (id, actionTask) => dispatch(createTask(id, actionTask)),
    }
}

export const AddTask = connect(mapStateToProps, mapDispatchToProps)(UnmountedAddTask);