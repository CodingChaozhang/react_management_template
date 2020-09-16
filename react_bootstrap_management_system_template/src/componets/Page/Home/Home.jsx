import React from 'react';
import PageTitle from '../../Page_Title/PageTitle';
import MyUtil from '../../Util/MyUtil.jsx';
import Statistic from '../../Service/Statistic_Service.jsx';

import '../../../assets/css/home.scss';
// 添加路由
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const _mm = new MyUtil;
const _statistic = new Statistic;


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userCount: '',
            productCount: '',
            orderCount: ''
          };
    }

    loadCount(){
        _statistic.getHomeCount().then(res=>{
            this.setState(res);
        },errMsg=>{
            _mm.errorTips(errMsg);
        })
    }

    componentDidMount(){
        this.loadCount();
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="首页">
                </PageTitle>
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/user" className='color-box brown'>
                            <p className="count">{this.state.userCount}</p>
                            <p className="desc">
                                <i className="fa fa-user"></i>
                                <span>用户总数</span>
                            </p>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="/product" className='color-box green'>
                            <p className="count">{this.state.productCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>商品总数</span>
                            </p>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="/order" className='color-box blue'>
                            <p className="count">{this.state.orderCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>订单总数</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;