import React, { Component } from "react";
import "./fresh.css";
import { machine_service } from "../service/mahcine.service";
import { Modal} from "antd-mobile";

export default class clean_panel extends Component {
  constructor(props) {
    super(props);
    this.check_qrcode = this.check_qrcode.bind(this);
    this.changeFilterToClean = this.changeFilterToClean.bind(this);
    this.changeFilterToNotClean = this.changeFilterToNotClean.bind(this);
    this.confirmFilterClean = this.confirmFilterClean.bind(this);
  }
  componentWillMount(){
    this.check_qrcode(this.props.qrcode);
  };

  check_qrcode = (qrcode) => {
    machine_service.check_exist(qrcode).then((response) => {
      if (response.responseCode === "RESPONSE_OK") {       
        this.obtain_filterIsClean(qrcode);
      }
    });
  };

  //获取滤网是否需要清洗
  obtain_filterIsClean = (qrcode) => {
    machine_service.obtain_filter_isClean(qrcode).then((response) => {
      if (response.responseCode === "RESPONSE_OK") {
        this.props.getFilterIsClean(response.data.isNeedClean);
        if (this.props.filterIsClean) {
          this.changeFilterToClean();
        } else {
          this.changeFilterToNotClean();
        }
      }
    });
  };

  //初滤网需要清洗
  changeFilterToClean = () => {
    let filterImgUrl = require("../../material/filter_icon/3.png");
    let filterInfo = "立即清洗";
    this.props.changeFilterStatus(filterImgUrl, filterInfo,"true");

  };

  //初滤网不需要清洗
  changeFilterToNotClean = () => {
  
    let filterImgUrl = require("../../material/filter_icon/1.png");
    let filterInfo = "";
    this.props.changeFilterStatus(filterImgUrl, filterInfo,"false");
    
  };

  //确认点击滤网清洗
  confirmFilterClean = ()=>{
    let alert = Modal.alert;
   if (this.props.filterIsClean === "true") {
      alert("温馨提示", "初效率网建议每30日清洗一次，已经清洗请点击重置按钮", [
        { text: "取消", onPress: () => console.log("cancel") },
        { text: "重置", onPress: () => {
          machine_service.confirm_filter_clean(this.props.qrcode);
          this.changeFilterToNotClean();        
        } },
      ]);
    }else{
     alert("温馨提示", "您的初滤网还未到清洗时间，若您已提前清洗，请点击重置", [
       { text: "取消", onPress: () => console.log("cancel") },
       { text: "重置", onPress: () => {
           machine_service.confirm_filter_clean(this.props.qrcode);
         } },
     ]);
   }
  };

  render() {
    const item_style = {
      width: "110px",
      height: "28px",
      background: "white",
      color: "black",
      alignItems: "center",
      flexDirection: "row",
      borderRadius: "1rem",
      border: "1px dashed #00A2E9",
      marginLeft: "15px",
      display: 'flex',
    };

    const panel_row = { 
      display: "flex",
      alignItems: "center",
    };

    const panel_item = {
      display: "flex",
      flex:"1",
      justifyContent: "left",
      alignItems: "center"
    }

    const img_style = {
      width: "13px",
      height: "13px",
      marginLeft: "1px",
      marginBottom:"1px"

    };

    const text_style = {
      fontSize: "1.3rem",
      color: "black",
     marginLeft:"5px",
    };

    const message_style = {
      WebkitTransform: "scale(0.7)",
      color: "orange",
      marginLeft: "-7px",
    };

    const buy_style = {
      height: "32px",
      background: "#00A2E9",
      color: "white",
      alignItems: "center",
      flexDirection: "column",
      borderRadius: "1rem",
      border: "1px dashed #00A2E9",
      marginLeft: "15px",
      width:"65px",
    };

    const buyText_style = {
      fontSize: "1.3rem",
      display: "flex",
      alignItems: "center",
      margin: "0.5rem",
    };

    return (
      <div className="operation_panel_1">
        <div style={panel_row}>
          <div style={panel_item}>
            <div style={item_style} onClick={this.confirmFilterClean}>
              <div style={text_style}>初滤网</div>
              <img src={this.props.filterImgUrl} style={img_style}></img>
              <div style={message_style}>{this.props.filterInfo}</div>
            </div>
          </div>
          {/*<div style={panel_item}>*/}
          {/*  <div style={item_style}>*/}
          {/*    <div style={text_style}>主滤网</div>*/}
          {/*    <img src={this.props.mainFilterImgUrl} style={img_style}></img>*/}
          {/*    <div style={message_style}>{this.props.mainfilterInfo}</div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          
          <div style={panel_item}>
            {
              this.props.buyFilter
               && 
              <div style={buy_style}>
                <div style={buyText_style}>购买滤网</div>
              </div>
            }
           </div>
        </div>
      </div>
    );
  }
}
