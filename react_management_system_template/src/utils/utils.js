export default{
    // 规范化时间格式
    formateDate(time){
        if(!time)
            return '';
        let date = new Date(time);
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    },
    // 简单的检查表单登录
    checkInfo(data){
        if(data.username=='admin'&data.password=='admin')
            return 'success'
        return 'faild'
    },
    // localstorage读取数据
    setStorage(name,data){
        let dataType = typeof data;

        if (dataType == 'object'){
            window.localStorage.setItem(name,JSON.stringify(data));
        }else if(['number','string','boolean'].indexOf(dataType)>=0){
            window.localStorage.setItem(name,data);
        }else{
            alert("该类型不能用于本地存储");
        }
    },

    // localstorage取数据
    getStorage(name){
        let data = window.localStorage.getItem(name)
        if(data){
            return JSON.parse(data);
        }else{
            return '';
        }
    },

    // localstorage移除数据
    removeStorage(name){
        window.localStorage.removeItem(name);
    }

}