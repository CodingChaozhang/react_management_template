import $ from 'jquery';

class MyUtil{
    request(param){
        return new Promise((resolve,reject)=>{
            $.ajax({
                type:       param.type      || 'get',
                url :       param.url       || '',
                dataType:   param.dataType  || 'json',
                data :      param.data      || null,
                success:res=>{
                    // 数据请求成功
                    if(res.status == 0){
                        // 登录成功
                        typeof resolve === 'function' && resolve(res.data,res.msg);
                    }else if(res.status == 10){
                        // 未登录
                        this.doLogin();
                    }else{
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error: err=>{
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
    }
    // 跳转登录
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    // 获取URL参数
    getUrlParam(name){
        //xx.com?param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '';
        //param=123&param1=456
        let reg = new RegExp("(^|&)" + name + '=([^&]*)(&|$)');
        
        let result = queryString.match(reg);
        // result:['param=123','','123','&']
        return result ? decodeURIComponent(result[2]): null;

    }
    // 错误提示
    errorTips(errMsg){
        alert(errMsg || '好像哪里不对了~')
    }

    // 检查登录接口的数据是否合法
    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username);
        let password = $.trim(loginInfo.password);

        if(typeof username!== 'string' || username.length == 0){
            return {
                status : false,
                msg: '用户名不能为空'
            }
        }

        if(typeof password!== 'string' || password.length == 0){
            return {
                status : false,
                msg: '密码不能为空'
            }
        }

        return {
            status : true,
            msg : '验证通过'
        }
    }

    //localstorage读取
    setStorage(name,data){
        let dataType = typeof data;
        // json
        if(dataType === 'object'){
            window.localStorage.setItem(name,JSON.stringify(data));
        }else if( ['number','string','boolean'].indexOf(dataType) >=0 ){
            window.localStorage.setItem(name,data);
        }else{
            alert("该类型不能用于本地存储");
        }
    }

    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }else{
            return '';
        }
    }

    removeStorage(name){
        window.localStorage.removeItem(name);
    }

    // 退出登录
    logout(){
        this.request({
            type : 'post',
            url: '/user/logout.do',
        });
    }
}
export default MyUtil;