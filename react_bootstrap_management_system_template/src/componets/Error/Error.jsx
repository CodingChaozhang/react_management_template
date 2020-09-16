import React from 'react';
import PageTitle from '../Page_Title/PageTitle';
import { Link } from 'react-router-dom';

class Error extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

          };
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="出错了">
                </PageTitle>
                <div className="row">
                    <div className="col md 12">
                        <span>找不到该路径!!!</span>
                        <Link to="/">点我返回首页</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Error;