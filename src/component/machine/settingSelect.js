import React, { Component } from "react";
import { message, Switch, Input } from "antd";
import { operation_service } from "../service/operation.service";
import { machine_service } from "../service/mahcine.service";
import "antd/dist/antd.css";
import { DatePicker, List, LocaleProvider,Modal } from "antd-mobile";
import zhCN from "antd-mobile/lib/locale-provider/locale-provider"

class SettingSelect extends Component {
  constructor(props) {
    super(props);
    this.timingOkClick = this.timingOkClick.bind(this);
    this.onSwitchChange = this.onSwitchChange.bind(this);
    this.usernameChangeOk = this.usernameChangeOk.bind(this);
    this.onStartTimeOk = this.onStartTimeOk.bind(this);
    this.onEndTimeOk = this.onEndTimeOk.bind(this);
    this.obtainFilterIsOpen = this.obtainFilterIsOpen.bind(this);
    this.onfilterSwitch = this.onfilterSwitch.bind(this);
    this.onVolumeSwitch = this.onVolumeSwitch.bind(this);
    this.obtainVolumeIsOpen = this.obtainVolumeIsOpen.bind(this);

    this.state={
      hideVolumeIfObtain:true
    }
  }

  componentDidMount() {
  
    this.props.startTimeChange(new Date("2018/12/14 21:00:00"));
    this.props.endTimeChange(new Date("2018/12/15 09:00:00"));
    this.obtainFilterIsOpen(this.props.qrcode);
    this.obtainVolumeIsOpen(this.props.qrcode);
  }

//滤网提醒是否打开
  obtainFilterIsOpen(qrcode){
    machine_service.obtain_filter_isOpen(qrcode).then((response) => {
        if (response.responseCode === "RESPONSE_OK") {
          if (response.data.isOpen) {
            this.props.filterSwitchOn();
          } else {
            this.props.filterSwitchOff();
          }
        }
      });
  }

  //是否开启隐藏风量
  obtainVolumeIsOpen(qrcode){
    console.log(this.state.hideVolumeIfObtain)
    machine_service.obtain_turboVolume_status(qrcode).then((response)=>{
      if (response.responseCode === "RESPONSE_OK") {
        if (response.data.turboVolumeStatus) {
          this.props.volumeSwitchOn();
        } else {
          this.props.volumeSwitchOff();
        }

      }
      else if(response.responseCode === "RESPONSE_ERROR"){
        //没有隐藏风量
        this.setState({hideVolumeIfObtain:false})
      }
    })

  }


  onSwitchChange(e) {
    if (e === true) {
      this.props.switchOn();
    } else {
      this.props.switchOff();
      operation_service.start_timing(
        this.props.qrcode,
        this.props.start_hour,
        this.props.start_minute,
        this.props.end_hour,
        this.props.end_minute,
        e
      );
    }
    this.props.expandTiming();
  }

  onStartTimeOk(e) {
    this.props.changeStartHour(e.getHours());
    this.props.changeStartMinute(e.getMinutes());
    this.props.startTimeChange(e);
  }

  onEndTimeOk(e) {
    this.props.changeEndHour(e.getHours());
    this.props.changeEndMinute(e.getMinutes());
    this.props.endTimeChange(e);
  }

  timingOkClick() {
    operation_service
      .start_timing(
        this.props.qrcode,
        this.props.start_hour,
        this.props.start_minute,
        this.props.end_hour,
        this.props.end_minute,
        this.props.switch
      )
      .then((response) => {
        if (response.responseCode === "RESPONSE_OK") {
          message.success("设置成功", 1);
        } else {
          message.error("设置异常", 1);
        }
      });
  }

  usernameChangeOk(e) {
    if (e.target.value === "") {
      message.warning("不能为空", 1);
      this.props.inputUsername(this.props.username);
      this.props.usernameOkClick();
    } else {
      machine_service.config_bind_name(this.props.qrcode, e.target.value);
      this.props.inputUsername(e.target.value);
      this.props.usernameOkClick();
    }
  }

  //滤网提醒
  onfilterSwitch(e) {
    let alert = Modal.alert;
    if (e === true) {
      alert("温馨提示", "开启初滤网清洁提醒后您将接收到微信的消息通知，确定请点击开启", [
        { text: "取消", onPress: () => console.log("cancel") },
        { text: "开启", onPress: () => {
            this.props.filterSwitchOn();
            machine_service.change_filter_status(this.props.qrcode, true);
          } },
      ]);

    } else {
      alert("温馨提示", "关闭初滤网清洁提醒后您将不会接收到微信的消息通知，确定请点击关闭", [
        { text: "取消", onPress: () => console.log("cancel") },
        { text: "关闭", onPress: () => {
            this.props.filterSwitchOff();
            machine_service.change_filter_status(this.props.qrcode, false);
          } },
      ]);

    }
  }

  //开启风扇隐藏风量
  onVolumeSwitch(e){
    let volumeAlert = Modal.alert;
    if (e === true) {
      volumeAlert("温馨提示", "开启隐藏风量后风量可调节范围将扩大，确定请点击开启", [
        { text: "取消", onPress: () => console.log("cancel") },
        { text: "开启", onPress: () => {
            this.props.volumeSwitchOn();
            machine_service.change_turboVolume_status(this.props.qrcode, true);
          } },
      ]);

    } else {
      volumeAlert("温馨提示", "关闭隐藏风量后风量可调节范围将缩小，确定请点击关闭", [
        { text: "取消", onPress: () => console.log("cancel") },
        { text: "关闭", onPress: () => {
            this.props.volumeSwitchOff();
            machine_service.change_turboVolume_status(this.props.qrcode, false);
          } },
      ]);

    }
  }

  render() {
    const setting_content = {
      backgroundColor: `white`,
      width: `100%`,
      borderRadius: `3px`,
    };
    const setting_gap = {
      width: `100%`,
      height: `1.4rem`,
      backgroundColor: `#dbdbdb`,
    };
    const setting_item = {
      height: `4.5rem`,
      lineHeight: `4.5rem`,
      fontSize: `1.45rem`,
      paddingRight: `6%`,
      paddingLeft: `6%`,
    };
    const inactive_setting_item = {
      height: `4.5rem`,
      lineHeight: `4.5rem`,
      fontSize: `1.45rem`,
      paddingRight: `6%`,
      paddingLeft: `6%`,
      backgroundColor: `#f2f2f2`,
    };
    const seperate_div = {
      height: `0.1rem`,
      backgroundColor: `#dbdbdb`,
    };
    console.log(this.props);
    return (
      <div>
        <div className="setting_gap" style={setting_gap} />
        <div className="setting_content" style={setting_content}>
          <div className="setting_item" style={setting_item}>
            <span>
              <i className="fa fa-user-o" aria-hidden="true" />
              &nbsp;&nbsp;设备名称
            </span>
            {!this.props.username_edit && (
              <span
                style={{ float: `right` }}
                onClick={this.props.editUsername}
              >
                {this.props.username}
              </span>
            )}
            {this.props.username_edit && (
              <span style={{ float: `right` }}>
                <Input placeholder="修改名称" onBlur={this.usernameChangeOk} />
              </span>
            )}
          </div>
        </div>
        <div className="setting_gap" style={setting_gap} />
        <div className="setting_content" style={setting_content}>
          <div className="setting_item" style={setting_item}>
            <span>
              <i className="fa fa-calendar" aria-hidden="true" />
            </span>
            &nbsp;&nbsp;定时任务
            <span style={{ float: `right` }}>
              <Switch
                onChange={this.onSwitchChange}
                checked={this.props.switch}
              />
            </span>
          </div>
          {this.props.expanded && (
            <div>
              <div className="seperate_div" style={seperate_div} />
              <div className="setting_item" style={setting_item}>
                <LocaleProvider locale={zhCN}>
                  <DatePicker
                    mode="time"
                    value={this.props.start_time}
                    minuteStep={30}
                    onOk={this.onStartTimeOk}
                  >
                    <List.Item arrow="horizontal">开始时间</List.Item>
                  </DatePicker>
                </LocaleProvider>
              </div>
              <div className="seperate_div" style={seperate_div} />
              <div className="setting_item" style={setting_item}>
                <LocaleProvider locale={zhCN}>
                  <DatePicker
                    mode="time"
                    value={this.props.end_time}
                    minuteStep={30}
                    onOk={this.onEndTimeOk}
                  >
                    <List.Item arrow="horizontal">关闭时间</List.Item>
                  </DatePicker>
                </LocaleProvider>
              </div>
              <div className="seperate_div" style={seperate_div} />
              <div className="setting_item" style={setting_item}>
                <div
                  onClick={this.timingOkClick}
                  style={{ textAlign: `center` }}
                >
                  保存
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="setting_gap" style={setting_gap} />
        {/*滤网提醒*/}
        <div className="setting_content" style={setting_content}>
          <div className="setting_item" style={setting_item}>
            <span>
              <i className="fa fa-table" aria-hidden="true" />
              &nbsp;&nbsp;滤网提醒
            </span>
          </div>
          <div className="seperate_div" style={seperate_div} />
          <div className="setting_item" style={setting_item}>
            <span>
              初滤网清洁
            </span>
            <span style={{ float: `right` }}>
              <Switch
                onChange={this.onfilterSwitch}
                checked={this.props.filterSwitch}
              />
            </span>
          </div>
          {/*隐藏风量开关*/}
          {
            this.state.hideVolumeIfObtain
              &&
            <div>
              <div className="setting_gap" style={setting_gap} />
              <div className="setting_item" style={setting_item}>
              <span>
              <i className="fa fa-recycle" aria-hidden="true" />
                &nbsp;&nbsp;隐藏风量
              </span>
                <span style={{ float: `right` }}>
              <Switch
                  onChange={this.onVolumeSwitch}
                  checked={this.props.volumeSwitch}
              />
              </span>
              </div>
            </div>

          }

        </div>

        <div className="setting_gap" style={setting_gap} />
        <div className="setting_content" style={setting_content}>
          <div className="setting_item" style={setting_item}>
            二维码
            <span style={{ float: `right` }}>{this.props.qrcode}</span>
          </div>
          <div className="seperate_div" style={seperate_div} />
          <div className="setting_item" style={setting_item}>
            版本号
            <span style={{ float: `right` }}>1.0</span>
          </div>
          <div className="seperate_div" style={seperate_div} />
          <div className="setting_item" style={setting_item}>
            固件信息
            <span style={{ float: `right` }}>1.0</span>
          </div>
          {/*<div className="seperate_div" style={seperate_div}></div>*/}
          {/*<div className="setting_item " style={inactive_setting_item}>*/}
          {/*检查更新*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }
}

export default SettingSelect;
