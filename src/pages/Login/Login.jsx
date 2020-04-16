import './Login.scss';

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            logged: false,
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
        fetch(`http://localhost:8888/taskapp/wp-json/api/auth/?login=${this.state.email}&password=${this.state.password}`)
        .then((response) => {
                return response.json();
        })
        .then((data) => {
            this.handleFetch(data);
        })
    }

    handleFetch = (response) => {

        switch(response.state) {
            case 'ok' : {
                localStorage.setItem('_t', response.token);
                this.setState({logged: true});
                break;
            }
            case 'error' : {
                this.setState({error: true});
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
                            <h2>Войти</h2>
                            <label>
                                <input onChange={this.inputChangeHandler} value={this.state.email} name="email" type="text" placeholder="Email" className="autorization-email"></input>
                            </label>
                            <label>
                                <input onChange={this.inputChangeHandler} value={this.state.password} name="password" type="password" placeholder="Пароль" className="autorization-password"></input>
                            </label>
                            {this.state.error ? <label><span>Неправильный логин / пароль</span></label> : <></>}
                            <button onClick={this.buttonClickHandler} value="Sign up" className="autorization-button">Войти</button>
                            <Link to="/taskapp/reg" className="subbutton">Зарегистрироваться</Link>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}