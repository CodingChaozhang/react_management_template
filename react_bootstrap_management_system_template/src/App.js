import React      from 'react';
import Home       from './componets/Page/Home/Home'
import Layout     from './componets/Layout/Layout'
import Login      from './componets/Page/Login/Login';
import ErrorPage  from './componets/Error/Error';
import UserList  from './componets/User/UserList';

import routes from './componets/modules/routers';

// 添加路由
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
// 页面
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 

     };
  }

  LayouRouter = (
    <Layout>
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/product"><Home /></Route>
          <Route path="/product-category"><Home /></Route>
          <Route path="/user/index"><UserList /></Route>
          <Redirect exact from="/user" to="/user/index"></Redirect>
          <Route><ErrorPage/></Route>
        </Switch>
        
    </Layout>
  );
  
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" render={routeProps=>this.LayouRouter}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;