import './Main.scss';

import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class Main extends Component {
    
    render() {
        return(
            <>
                <div className="first_section">
                    <div className="wrapper">
                        <div className="first_section-title">
                            <h2>TaskUp</h2>
                            <h1>Управлять задачами<br />легче лёгкого</h1>
                            <p>Простой и лаконичный менеджер ваших задач</p>
                            <nav>
                                <Link to="auth" className="signin">Войти</Link>
                                <Link to="reg" className="signout">Зарегистрироваться</Link>
                            </nav>
                        </div>
                        <div className="first_section-image">
                            <img src="./img/notebook.png" alt="notebook"/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}