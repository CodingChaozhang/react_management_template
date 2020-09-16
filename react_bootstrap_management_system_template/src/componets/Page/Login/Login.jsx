import React from 'react';
import '../../../assets/css/login.scss';
import MyUtil from '../../Util/MyUtil.jsx';

const _mm = new MyUtil;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:'',
            password:'',
            redirect: _mm.getUrlParam('redirect') || '/'
         };
    }
    componentDidMount(){
        document.title = "登录-Admin";
    }
    // 用户名事件
    OnInputChange=(e)=>{
        let inputname = e.target.name;
        let inputvalue = e.target.value;
        this.setState({
            [inputname]: inputvalue
        });
    }
    // 登录的方法
    onSubmit=()=>{
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        };
        
        let checkResult = _mm.checkLoginInfo(loginInfo);
        // 表单验证
        if(checkResult.status){
            _mm.request({
                type : 'post',
                url: '/manage/user/login.do',
                data:{
                    username: this.state.username,
                    password: this.state.password
                }
            }).then((res)=>{
                // console.log("======")
                // console.log(this.state.redirect)
                // 将用户名存在localStorage中
                _mm.setStorage('userInfo',res);
                this.props.history.push(this.state.redirect);
            },(errMsg)=>{
                _mm.errorTips(errMsg);
            })
        }else{
            _mm.errorTips(checkResult.msg);
        }
        
    }
    onInputKeyUp=(e)=>{
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    render() {
        return (
                <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default login-pannel">
                        <div className="panel-heading">欢迎登录管理系统</div>
                        <div className="panel-body">
                            <div>
                                <div className="form-group">
                                    <input type="text" name='username' className="form-control"  placeholder="请输入用户名" onKeyUp={this.onInputKeyUp} onChange={this.OnInputChange}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" name='password' className="form-control"  placeholder="请输入密码"  onKeyUp={this.onInputKeyUp}  onChange={this.OnInputChange}/>
                                </div>
                                <button  className="btn btn-lg btn-primary btn-block" onClick={this.onSubmit}>登录</button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Login;