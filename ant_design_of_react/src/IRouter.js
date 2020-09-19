import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import App from './App';
import Admin from './Admin';
import Home from './pages/home';
import NotMatch from './pages/NotMatch';
import Login from './pages/login';

import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loading from './pages/ui/loadings';
import Notification from './pages/ui/notice';
import Message from './pages/ui/message';
import Table from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousel from './pages/ui/carousel';

import FormLogin from './pages/form/login';
import FormReg from './pages/form/register';

import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable';

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

                                <Route path="/admin/ui/buttons">
                                    <Buttons/>
                                </Route>
                                <Route path="/admin/ui/modals">
                                    <Modals/>
                                </Route>
                                <Route path="/admin/ui/loadings">
                                    <Loading/>
                                </Route>
                                <Route path="/admin/ui/notification">
                                    <Notification/>
                                </Route>
                                <Route path="/admin/ui/messages">
                                    <Message/>
                                </Route>
                                <Route path="/admin/ui/tabs">
                                    <Table/>
                                </Route>
                                <Route path="/admin/ui/gallery">
                                    <Gallery/>
                                </Route>
                                <Route path="/admin/ui/carousel">
                                    <Carousel/>
                                </Route>
                                

                                <Route path="/admin/table/basic">
                                    <BasicTable/>
                                </Route>
                                <Route path="/admin/table/high">
                                    <HighTable/>
                                </Route>
                                
                                <Route path="/admin/form/login">
                                    <FormLogin/>
                                </Route>
                                <Route path="/admin/form/reg">
                                    <FormReg/>
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