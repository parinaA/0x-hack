import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import OrderBook from './orderBook';
import CreateOrder from './CreateOrder';
import order from './App'
export const history = createHistory();

export default class Routers extends React.Component {
        render() {
            return (
                <Router history={history}>
                
                <Switch>
                <Route path='/' component={OrderBook} exact={true}/>
                <Route path='/create' component={CreateOrder} />
                <Route path='/order' component={order} />
                </Switch>
                </Router>
            );
        }
}