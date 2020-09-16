import MyUtil from '../Util/MyUtil.jsx';

const _mm = new MyUtil();

class Statistic_Service{
    //加载首页数据
    getHomeCount(){
        return _mm.request({
            url:'/manage/statistic/base_count.do'
        });
    }
}

export default Statistic_Service;