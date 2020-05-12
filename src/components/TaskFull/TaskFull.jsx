// Подключаем стили
import './TaskFull.scss';

// Подключаем библиотеки
import React, { Component } from 'react';

// Класс компонента
export class TaskFull extends Component {
    render() {
        return(
            <div className="taskslist task__full">
                <div className="task">
                    <h2 className="task-header">{this.props.title}</h2>
                    <label className="task-bookmark">
                        <svg className="task-bookmark-svg" xmlns="http://www.w3.org/2000/svg" width="21pt" height="21pt" viewBox="0 0 21 21" version="1.1">
                            <path fill={this.props.badgeColor} d="M 4.375 3.5 L 4.375 19.25 L 10.5 16.625 L 16.625 19.25 L 16.625 3.5 C 16.625 2.539062 15.835938 1.75 14.875 1.75 L 6.125 1.75 C 5.164062 1.75 4.375 2.539062 4.375 3.5 Z M 4.375 3.5 "/>
                        </svg>
                    </label>
                    <div className="task-body">{this.props.description}</div>
                    <div className="task-controls">
                        {this.props.status !== 'planned' && this.props.status !== 'complete' && <button className="task-control control-run" onClick={() => this.handle(this.props.id, 'planned')}>В план</button>}
                        {this.props.status !== 'work' && <button className="task-control control-run" onClick={() => this.handle(this.props.id, 'work')}>В работу</button>}
                        {this.props.status !== 'complete' && this.props.status !== 'planned' && <button className="task-control control-run" onClick={() => this.handle(this.props.id, 'complete')}>Завершить</button>}
                        <button className="task-control control-del" onClick={() => this.handle(this.props.id, 'delete')}>Удалить</button>
                    </div>
                </div>
            </div>
        )
    }
}