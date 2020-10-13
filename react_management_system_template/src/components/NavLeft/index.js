import React from 'react';
import { Menu } from 'antd';
import './index.less';
// 引入侧边栏配置
import MenuConfig from '../../config/menuConfig';
import {NavLink} from 'react-router-dom';

const { SubMenu } = Menu;

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  

        };
    }

    // 刷新挂载组件
    componentDidMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        })
    }

    // 菜单渲染
    renderMenu=(data)=>{
        return data.map((item)=>{
            if(item.children){
                return(
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                        {item.title}
                            <NavLink to={item.key}></NavLink>
                   </Menu.Item>
        })
    }

    render() {
        return (
            <div className="navleft">
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>博客后台管理系统</h1>   
                </div>

                <Menu theme="dark" defaultOpenKeys={['/admin/manage_blog']}  mode="inline">
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }
}

export default index;