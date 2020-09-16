import React    from 'react';
import {Link}   from 'react-router-dom';
import MyUtil from '../Util/MyUtil.jsx';

const _mm = new MyUtil;

class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: _mm.getStorage("userInfo").username || ''
         };
    }
    // 这是退出登录
    onLogout=()=>{
        _mm.request({
            type : 'post',
            url: '/user/logout.do',
        }).then(res=>{
            console.log("111");
            _mm.removeStorage('userInfo');
            // this.props.history.push("/login");
            window.location.href = ("/login");
        },errMsg=>{
            console.log("222");
            _mm.errorTips(errMsg);
        })
    }
    render() {
        return (
           <div  className="navbar navbar-default top-navbar">
               <div className="navbar-header">
                <Link className="navbar-brand" to="/"><b>HAPPY</b>MALL</Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
             
                <li className="dropdown">
                    <a className="dropdown-toggle"  href="#!" >
                        <i className="fa fa-user fa-fw"></i>
                        {
                            this.state.username?<span>欢迎，{this.state.username}</span>:<span>欢迎</span>
                        }
                            
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        {/* <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
                        </li>
                        <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
                        </li>
                        <li className="divider"></li> */}
                        <li>
                            <a onClick={this.onLogout}>
                                <i className="fa fa-sign-out fa-fw"></i> 
                                <span>退出登录</span>
                            </a>
                        </li>
                    </ul>
                </li>

            </ul>
           </div>                    
        );
    }
}

export default TopNav;