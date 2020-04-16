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

ReactDom.render(
    <Provider store={store} >
        <BrowserRouter>
            <Switch>
                <Route path="/taskapp/" component={Main} exact />
                <Route path="/taskapp/auth" component={Login} exact />
                <Route path="/taskapp/reg" component={Reg} exact />
                <Route path="/taskapp/dashboard" component={Dashboard} exact />
            </Switch>
            {localStorage.getItem('_t') ? <Redirect to="/taskapp/dashboard" /> : <></>}
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);