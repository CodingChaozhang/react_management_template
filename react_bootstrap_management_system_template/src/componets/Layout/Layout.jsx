import React from 'react';
import TopNav from '../TopNav/TopNav';
import SideNav from '../SideNav/SideNav';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div id="wrapper">
                <TopNav/>
                <SideNav/>
                {this.props.children}
            </div>
        );
    }
}

export default Layout;