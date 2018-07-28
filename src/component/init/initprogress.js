import React from 'react'

import {ProgressBar} from 'react-bootstrap'

import Fade from 'react-reveal/Fade';

const progress_area = {
    width: `90%`,
    margin: `3rem 5% 3rem 5%`
}

class InitProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0,
            show_steps: 0
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let percent = this.state.percent + 2;
            this.setState({percent: percent});
            if(percent >= 100) {
                this.props.init();
                clearInterval(this.interval);
            }
            if(this.state.percent >= 66) {
                this.setState({show_steps: 3});
            }else if(this.state.percent >= 33) {
                this.setState({show_steps: 2});
            }else {
                this.setState({show_steps: 1});
            }
        }, 80);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div style={progress_area}>
                <div>设备初始化中</div>
                <ProgressBar active now={this.state.percent}></ProgressBar>
                {this.state.show_steps >= 1 ? <Fade right>正在获取设备配置</Fade> : ''}
                {this.state.show_steps >= 2 ? <Fade right>正在搜集用户设备注册信息</Fade> : ''}
                {this.state.show_steps >= 3 ? <Fade right>正在检查设备联网状态</Fade> : ''}
            </div>
        )
    }
}

export default InitProgress;