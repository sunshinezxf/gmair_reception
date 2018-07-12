import React from 'react'

import {Col, Row} from 'react-bootstrap'

import {Collapse} from 'react-collapse'

const operation_area = {
    marginTop: `1.5rem`,
    border: `0.1rem dashed #00A2E9`,
    borderRadius: `0.5rem`
}

const operation_icon = {
    fontSize: `1.8rem`,
    fontWeight: `lighter`
}

const operation_gap_top = {
    height: `2rem`,
    width: `100%`
}

const operation_gap_bottom = {
    height: `1rem`,
    width: `100%`
}

class Operation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operations: [],
            expanded: false
        }
        this.expand = this.expand.bind(this);
    }

    expand = () => {
        let current = this.state.expanded;
        this.setState({expanded: !current});
    }

    render() {
        return (
            <div style={operation_area}>
                <div style={operation_gap_top}></div>
                <Row>
                    <Col xs={4} md={4}>
                        <i className='fa fa-power-off' style={operation_icon}></i>
                        <div>电源</div>
                    </Col>
                    <Col xs={4} md={4}>
                        <i className='fa fa-moon-o' style={operation_icon}></i>
                        <div>睡眠</div>
                    </Col>
                    <Col xs={4} md={4}>
                        <i className='fa fa-refresh' style={operation_icon}></i>
                        <div>自动</div>
                    </Col>
                </Row>
                <div style={operation_gap_bottom}></div>
                <Collapse isOpened={this.state.expanded}>
                    <div style={operation_gap_top}></div>
                    <Row>
                        <Col xs={4} md={4}>
                            <i className='fa fa-life-bouy' style={operation_icon}></i>
                            <div>风量</div>
                        </Col>
                        <Col xs={4} md={4}>
                            <i className='fa fa-lightbulb-o' style={operation_icon}></i>
                            <div>屏显</div>
                        </Col>
                        <Col xs={4} md={4}>
                            <i className='fa fa-thermometer' style={operation_icon}></i>
                            <div>辅热</div>
                        </Col>
                    </Row>
                    <div style={operation_gap_bottom}></div>
                    <div style={operation_gap_top}></div>
                    <Row>
                        <Col xs={4} md={4}>
                            <i className='fa fa-child' style={operation_icon}></i>
                            <div>童锁</div>
                        </Col>
                        <Col xs={4} md={4}>
                            <i className='fa fa-recycle' style={operation_icon}></i>
                            <div>节能</div>
                        </Col>
                        <Col xs={4} md={4}>
                            <i className='fa fa-clock-o' style={operation_icon}></i>
                            <div>定时</div>
                        </Col>
                    </Row>
                    <div style={operation_gap_bottom}></div>
                </Collapse>
                <div onClick={this.expand}><i className={this.state.expanded == false ? 'fa fa-angle-double-down' : 'fa fa-angle-double-up'}></i></div>
            </div>
        )
    }
}

export default Operation