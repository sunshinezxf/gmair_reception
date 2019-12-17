import React, { Component } from 'react';
import 'antd/dist/antd.css'
import on_off_bg from '../../material/bg/gmair_bg.jpg';
import power_img from '../../material/icon/power.png';
import {machine_service} from '../service/mahcine.service'

const on_off_header = {
    position: `relative`,
    paddingBottom:`2rem`,
    backgroundColor:`white`,
}

const on_off_bg_style = {
    width: `100%`,
    height: `20rem`,
}

const controller_container_on_style = {
    position: `absolute`,
    bottom: `4rem`,
    right: `3rem`,
    width: `6rem`,
    height: `6rem`,
    padding: `1rem 1.5rem`,
    backgroundColor: `rgb(7, 179, 243)`,
    borderRadius:`3rem`,
    display: `flex`,
    flexWrap: `wrap`,
    boxShadow: `0 0 0.3rem 1rem rgb(7, 179, 243, 0.2)`,
}

const controller_container_off_style = {
    position: `absolute`,
    bottom: `4rem`,
    right: `3rem`,
    width: `6rem`,
    height: `6rem`,
    padding: `1rem 1.5rem`,
    backgroundColor: `#cccccc`,
    borderRadius:`3rem`,
    display: `flex`,
    flexWrap: `wrap`,
    boxShadow: `0 0 0.3rem 1rem rgba(204, 204, 204 , 0.5)`,
}

const power_icon_container_style = {
    margin: `0 0.4rem 0.3rem 0.4rem`
}

const power_icon_style = {
    width: `100%`,
}

const on_off_text = {
    fontSize: `1rem`,
    textAlign: `center`,
    color: `white`
}

// let machine_status = {
//     power_status:false
// }

class OnOffHeader extends Component {
    constructor(props) {
        super(props);
        this.power_click = this.power_click.bind(this);
    }

    componentWillMount(){
        // this.props.machine_status = {
        //     power_status:false
        // }
        // controller_container_style.backgroundColor=this.props.machine_status.power_status?`rgb(7, 179, 243)`:`#cccccc`;
    }

    render() {
        return (
            <div style={on_off_header}>
                <img src={on_off_bg} style={on_off_bg_style}></img>
                <div style={this.props.power_status?controller_container_on_style:controller_container_off_style}
                    onClick={this.power_click}>
                    <div style={power_icon_container_style}>
                        <img src={power_img} style={power_icon_style}></img>
                    </div>
                    <div style={on_off_text}>{this.props.power_status?'已开启':'已关闭'}</div>
                </div>
            </div>
        );
    }

    //电源点击
    power_click(){
        let machine_status = this.props.machine_status;
        console.log(machine_status)
        if(machine_status.power_status){
            machine_service.operate(this.props.qrcode, 'power', 'off');
            machine_status.power_status = false
        }else {
            machine_service.operate(this.props.qrcode, 'power', 'on');
            machine_status.power_status = true
        }
        this.props.changeMachineStatus(machine_status);
    }
}

export default OnOffHeader;
