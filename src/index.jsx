// Import main styles
import './index.scss';

// Import React
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store.js';

// Import Paged
import { Main } from 'pages/Main';
import { Login } from 'pages/Login';
import { Reg } from 'pages/Reg';
import { Dashboard } from 'pages/Dashboard';
import { AddTask } from 'pages/AddTask';

ReactDom.render(
    <Provider store={store} >
        <BrowserRouter>
            <Switch>
                <Route path="/app-task/" component={Main} exact />
                <Route path="/app-task/auth/" component={Login} exact />
                <Route path="/app-task/reg/" component={Reg} exact />
                <Route path="/app-task/dashboard/" component={Dashboard} exact />
                <Route path="/app-task/dashboard/add/" component={AddTask} exact />
            </Switch>
            {localStorage.getItem('_t') ? <Redirect to="/app-task/dashboard/" /> : <></>}
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);