import React from 'react'

import {TabBar} from 'antd-mobile'

const tab_bar_area = {
    position: `fixed`,
    bottom: `0px`,
    width: `100%`
};

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.mine_device = this.mine_device.bind(this);
        this.mine_info = this.mine_info.bind(this);
        this.state = {
            index: 0
        }
    }

    componentDidMount() {
        let index = this.props.index;
        this.setState({index: index});
    }

    mine_device = () => {
        window.location.href = '/machine/list';
    };

    mine_info = () => {
        window.location.href = '/personal/information'
    };

    render() {
        return (
            <div style={tab_bar_area}>
                <TabBar barTintColor='whitesmoke'>
                    {
                        this.state.index === 0 ?
                            <TabBar.Item icon={<span><i className='fa fa-cloud'/></span>}
                                         selectedIcon={<span><i className='fa fa-cloud'/></span>} title='设备' key='设备'
                                         selected={this.state.index === 0}/>
                            :
                            <TabBar.Item icon={<span><i className='fa fa-cloud'/></span>}
                                         selectedIcon={<span><i className='fa fa-cloud'/></span>} title='设备' key='设备'
                                         onPress={this.mine_device}/>
                    }
                    {
                        this.state.index === 1 ?
                            <TabBar.Item icon={<span><i className='fa fa-user-circle'/></span>}
                                         selectedIcon={<span><i className='fa fa-user-circle'/></span>} title='我的'
                                         key='我的'
                                         selected={this.state.index === 1}/>
                            :
                            <TabBar.Item icon={<span><i className='fa fa-user-circle'/></span>}
                                         selectedIcon={<span><i className='fa fa-user-circle'/></span>} title='我的'
                                         key='我的'
                                         onPress={this.mine_info}/>
                    }
                </TabBar>
            </div>
        )
    }
}

export default Navigation;