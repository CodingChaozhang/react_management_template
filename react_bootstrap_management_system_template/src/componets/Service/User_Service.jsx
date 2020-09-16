import MyUtil from '../Util/MyUtil.jsx';

const _mm = new MyUtil();

class User_Service{
    //加载首页数据
    getUserList(pageNum){
        return _mm.request({
            type : 'post',
            url:'/manage/user/list.do',
            data:{
                pageNum:pageNum
            }            
        });
    }
}

export default User_Service;