import React, { Component } from 'react';
import Index from './Index';
import Home from './Home';
import Editor from './Editor';
import { Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSet: {
                problems: []
            },
            problem: {}
        }
    }

    render() {
        ReactGA.initialize(GA_ACCOUNT_ID);
        return (
            <Switch>
                <Route exact path='/set/:action/:code' render={p => <Home {...p}/> } />
                <Route exact path='/problem/:action/:code' render={p => <Editor {...p}/> } />
                <Route exact path='/' render={p => <Index {...p} />} />
            </Switch>
        )
    }
}
