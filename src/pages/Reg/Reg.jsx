import './Reg.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Reg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    buttonClickHandler = (e) => {
        e.preventDefault();
        let pathToAPI = 'http://localhost:8888/taskapp/wp-json/api/registation/';

        let data = {
            login: this.state.email,
            password: this.state.password,
            error: false,
            errorText: '',
            logged: false
        };

        // Запрос
        fetch(pathToAPI, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
            }).then((response) => {
                return response.json();
            }).then((data) => {
                this.handleFetch(data);
            })
    }

    handleFetch = (response) => {
        console.log(response);
        switch(response.state) {
            case 'ok' : {
                localStorage.setItem('_t', response.token)
                this.setState({logged: true});
                break;
            }
            case 'error' : {
                this.setState({error: true, errorText: response.reason});
                break;
            }
        }
    }

    render() {
        return (
            <>
                {this.state.logged ? <Redirect to="/taskapp/dashboard" /> : <></>}
                <div className="autorization">
                    <div className="autorization__wrapper">
                        <h1><Link to="/taskapp">TaskUp</Link></h1>
                        <form className="autorization-field">
                            <h2>Регистрация</h2>
                            <label>
                                <input onChange={this.inputChangeHandler} value={this.state.email} name="email" type="email" placeholder="Email" className="autorization-email" requred="true"></input>
                            </label>
                            <label>
                                <input onChange={this.inputChangeHandler} value={this.state.password} name="password" type="password" placeholder="Пароль" className="autorization-password" requred="true"></input>
                            </label>
                            {this.state.error ? <label><span>{this.state.errorText}</span></label> : <></>}
                            <button onClick={this.buttonClickHandler} value="Sign up" className="autorization-button">Зарегистрироваться</button>
                            <Link to="/taskapp/auth" className="subbutton">Войти</Link>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}