import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import App from './App';
import Admin from './Admin';
import Home from './pages/home';
import NotMatch from './pages/NotMatch';
import Login from './pages/login';
import User from './pages/user';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import Rich from './pages/rich';
import Permission from './pages/permission';

class IRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  

        };
    }
    render() {
        return (
            <BrowserRouter>
                <App>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/admin/home">
                                    <Home/>
                                </Route>
                                <Route path="/admin/manage_user">
                                    <User/>
                                </Route>


                                <Route path="/admin/manage_echarts/bar">
                                    <Bar/>
                                </Route>
                                <Route path="/admin/manage_echarts/pie">
                                    <Pie/>
                                </Route>
                                <Route path="/admin/manage_echarts/line">
                                    <Line/>
                                </Route>

                                <Route path="/admin/rich">
                                    <Rich/>
                                </Route>

                                <Route path="/admin/permission">
                                    <Permission/>
                                </Route>
                                

                                <Route >
                                    <NotMatch/>
                                </Route>
                            </Switch>
                        </Admin>
                    }>
                    </Route>
                </App>
            </BrowserRouter>
        );
    }
}

export default IRouter;