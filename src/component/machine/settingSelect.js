import React, {Component} from 'react';
import {message, Select, Switch, Icon, Input} from 'antd';
import 'antd/dist/antd.css';
import {operation_service} from '../service/operation.service';

const Option = Select.Option;
const hoursData = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
const minuteData = ["00", "30"];

class SettingSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switch: false,
        }
        this.timingOkClick = this.timingOkClick.bind(this);
        this.onSwitchChange = this.onSwitchChange.bind(this);
        this.usernameChangeOk=this.usernameChangeOk.bind(this);
    }

    componentDidMount() {

    }

    onSwitchChange(value) {
        this.props.expandTiming();
    }

    timingOkClick() {
        message.success("设置成功", 1);
        console.log("开启时间:"+operation_service.formatTime(this.props.start_hour,this.props.start_minute));
        console.log("关闭时间:"+operation_service.formatTime(this.props.end_hour,this.props.end_minute));
    };
    usernameChangeOk(e){
        if(e.target.value===''){
            message.warning("不能为空",1);
            this.props.inputUsername("绥守");
            this.props.usernameOkClick();
        }else {
            this.props.inputUsername(e.target.value);
            this.props.usernameOkClick();
        }
    }


    render() {
        const setting_content = {
            backgroundColor: `white`,
            width: `100%`,
            borderRadius: `3px`,
        }
        const setting_gap = {
            width: `100%`,
            height: `1.4rem`,
            backgroundColor: `#dbdbdb`,
        }
        const setting_item = {
            height: `4.5rem`,
            lineHeight: `4.5rem`,
            fontSize: `1.45rem`,
            paddingRight: `6%`,
            paddingLeft: `6%`,
        }
        const seperate_div = {
            height: `0.1rem`,
            backgroundColor: `#dbdbdb`,
        }
        return (
            <div>
                <div className="setting_gap" style={setting_gap}></div>
                <div className="setting_content" style={setting_content}>
                    <div className="setting_item" style={setting_item}>
                        <span><i className="fa fa-user-o" aria-hidden="true"></i>&nbsp;&nbsp;设备名称</span>
                        {!this.props.username_edit &&
                        <span style={{float: `right`}} onClick={this.props.editUsername}>{this.props.username}</span>
                        }
                        {this.props.username_edit &&
                            <span style={{float: `right`}}><Input placeholder="修改名称" onBlur={this.usernameChangeOk}></Input></span>
                        }

                    </div>
                </div>
                <div className="setting_gap" style={setting_gap}/>
                <div className="setting_content" style={setting_content}>
                    <div className="setting_item" style={setting_item}>
                        <span><i className="fa fa-calendar" aria-hidden="true"></i></span>&nbsp;&nbsp;定时任务
                        <span style={{float: `right`}}>
                            <Switch onChange={this.onSwitchChange}></Switch>
                        </span>
                    </div>
                    {this.props.expanded &&
                    <div>
                        <div className="seperate_div" style={seperate_div}></div>
                        <div className="setting_item" style={setting_item}>
                            开启时间
                            <div style={{float: `right`}}>
                                <Select style={{width: `7rem`}} defaultValue={hoursData[0]}
                                        onChange={this.props.changeStartHour}>
                                    {hoursData.map(hour => <Option key={hour}>{hour}</Option>)}
                                </Select>&nbsp;
                                <Select style={{width: `7rem`}} defaultValue={minuteData[0]}
                                        onChange={this.props.changeStartMinute}>
                                    {minuteData.map(minute => <Option key={minute}>{minute}</Option>)}
                                </Select>
                            </div>
                        </div>
                        <div className="seperate_div" style={seperate_div}></div>
                        <div className="setting_item" style={setting_item}>
                            关闭时间
                            <div style={{float: `right`}}>
                                <Select style={{width: `7rem`}} defaultValue={hoursData[0]}
                                        onChange={this.props.changeEndHour}>
                                    {hoursData.map(hour => <Option key={hour}>{hour}</Option>)}
                                </Select>&nbsp;
                                <Select style={{width: `7rem`}} defaultValue={minuteData[0]}
                                        onChange={this.props.changeEndMinute}>
                                    {minuteData.map(minute => <Option key={minute}>{minute}</Option>)}
                                </Select>
                            </div>
                        </div>
                        <div className="seperate_div" style={seperate_div}></div>
                        <div className="setting_item" style={setting_item}>
                            <div onClick={this.timingOkClick} style={{textAlign: `center`}}>确定</div>
                        </div>
                    </div>
                    }
                </div>
                <div className="setting_gap" style={setting_gap}></div>
                <div className="setting_content" style={setting_content}>
                    <div className="setting_item" style={setting_item}>
                        二维码
                        <span style={{float: `right`}}>AAAAA</span>
                    </div>
                    <div className="seperate_div" style={seperate_div}></div>
                    <div className="setting_item" style={setting_item}>
                        版本号
                        <span style={{float: `right`}}>1.0.2</span>
                    </div>
                    <div className="seperate_div" style={seperate_div}></div>
                    <div className="setting_item" style={setting_item}>
                        固件信息
                        <span style={{float: `right`}}>2.0</span>
                    </div>
                    <div className="seperate_div" style={seperate_div}></div>
                    <div className="setting_item" style={setting_item}>
                        检查更新
                    </div>


                </div>
            </div>

        )
    }
}


export default SettingSelect;