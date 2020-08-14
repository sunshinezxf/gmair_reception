import React,{Component} from 'react';
import fresh_header_image from '../../material/bg/fresh_bg.jpg';
import power_icon from '../../material/icon/power.png'
import './fresh.css'
import {Toast,Modal} from "antd-mobile";
import {consumerservice} from "../service/consumer.service";
import {operation_service} from "../service/operation.service";
import {message} from "antd";
import {machine_service} from "../service/mahcine.service";

const alert = Modal.alert;
class FreshHeader extends Component{
    constructor(props) {
        super(props);
        this.drop_out_window = this.drop_out_window.bind(this);
        this.picture_on_click = this.picture_on_click.bind(this);
        this.power_click = this.power_click.bind(this);
        this.obtainHeaderImg = this.obtainHeaderImg.bind(this);
        this.check_qrcode = this.check_qrcode.bind(this);

        this.state={
            headerImg:fresh_header_image
        }
    }

    componentDidMount() {
        this.check_qrcode(this.props.qrcode)
    }

    check_qrcode(qrcode){
        machine_service.check_exist(qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                let modelId = response.data[0].modelId;
               this.obtainHeaderImg(modelId);
            }
        })
    }

    drop_out_window() {
        window.wx.closeWindow();
    }

    picture_on_click() {
        Toast.loading('加载中...', 2);
        consumerservice.profile().then(response => {
            if (response.responseCode === "RESPONSE_OK") {
                operation_service.push_picture(this.props.qrcode).then(response => {
                    if (response.responseCode === "RESPONSE_OK") {
                        alert('生成成功', '图片将在几秒内推送到公众号聊天窗口，可前往查看', [
                            {text: '下次再说',},
                            {text: '立即前往', onPress: this.drop_out_window},
                        ])
                    }
                    else {
                        message.error("图片生成失败", 1);
                    }
                })
            } else {
                message.error("推送失败,未绑定微信号", 1);
            }
        })
    }

    power_click(){
        let machine_status = this.props.machine_status;
        // console.log(machine_status)
        if(machine_status.power_status){
            machine_service.operate(this.props.qrcode, 'power', 'off');
            machine_status.power_status = false
        }else {
            machine_service.operate(this.props.qrcode, 'power', 'on');
            machine_status.power_status = true
        }
        this.props.changeMachineStatus(machine_status);
    }

    //获取图片链接
    obtainHeaderImg(modelId){
        machine_service.obtain_model(modelId).then(response=>{
            if (response.responseCode === "RESPONSE_OK"){
                if(response.data[0].modelBg != null){
                    this.setState({
                        headerImg:response.data[0].modelBg
                    })
                }
            }
        })
    }

    render() {
        // console.log(this.props)
        return (
                <div className="fresh_header_bg">
                    <img src={this.state.headerImg} width="100%"/>
                    <div className="header_container">
                        <span onClick={this.picture_on_click}>
                            <i className="fa fa-picture-o header_icon_size"   aria-hidden="true"></i></span>
                        <span onClick={() => {
                            window.location.href = "/machine/operation/" + this.props.qrcode;
                        }}><i className='fa fa-cog header_icon_size_2'></i> </span>
                    </div>
                    {this.props.machine_status.power_status&&
                    <div className="on_off_panel" onClick={this.power_click}>
                        <img src={power_icon} width="22rem" ></img>
                        <div className="on_off_text">已开启</div>
                    </div>
                    }
                    {!this.props.machine_status.power_status&&
                    <div className="off_on_panel" onClick={this.power_click}>
                        <img src={power_icon} width="22rem" ></img>
                        <div className="on_off_text">已关闭</div>
                    </div>
                    }

                </div>
        );
    }

}
export default FreshHeader;
