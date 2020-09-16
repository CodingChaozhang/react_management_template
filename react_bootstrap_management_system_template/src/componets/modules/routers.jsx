import Home from '../Page/Home/Home';
import UserList from '../User/UserList';


/**
 * exact 属性
 关于Route的exact,加上exact代表当前路由path的路径采用精确匹配，
 一般path=”/"这个路由一般会加上exact，
 另外需要注意一点的是嵌套路由不要加exact属性，
 如果父级路由加上，他下面的子路由将不会生效，因为外层强制匹配了。
 */
const routes = [
    {
      path: "/",
      component: Home,
      exact:true
    },
    {
      path: "/product",
      component: Home,
    },
    {
      path:"/user",
      component:UserList,
      routes: [
        {
          path: "/user/index",
          component: UserList
        }
      ]
    },

  ];

  export default routes;