import React from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

class Pagination extends React.Component {
    constructor(props){
        super(props);

    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <RcPagination {...this.props}
                        hideOnSinglePage
                        showQuickJumper
                    />
                </div>
            </div>
        );
    }
}

export default Pagination;