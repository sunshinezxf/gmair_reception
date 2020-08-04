import React, { Component } from "react";
import "./fresh.css";
import { machine_service } from "../service/mahcine.service";
import { Modal} from "antd-mobile"

export default class clean_panel extends Component {
  constructor(props) {
    super(props);
    this.check_qrcode = this.check_qrcode.bind(this);
    this.changeFilterToClean = this.changeFilterToClean.bind(this);
    this.changeFilterToNotClean = this.changeFilterToNotClean.bind(this);
    this.confirmFilterClean = this.confirmFilterClean.bind(this);
    this.obtain_filterIsClean = this.obtain_filterIsClean.bind(this);
    this.obtain_mainFilterStatus = this.obtain_mainFilterStatus.bind(this);
    this.confirmMainFilterStatus = this.confirmMainFilterStatus.bind(this);
    this.obtainMaterialsUrl = this.obtainMaterialsUrl.bind(this);


    this.state = {
      main_text_style_color:"black",
      main_message_style_color:"orange",
      materialsUrl:"javascript:void(0)",
      mainFilterIfObtain:true
    }
  }
  componentDidMount(){
    this.check_qrcode(this.props.qrcode);
  };

  check_qrcode = (qrcode) => {
    machine_service.check_exist(qrcode).then((response) => {
      if (response.responseCode === "RESPONSE_OK") {
        let modelId = response.data[0].modelId;
        this.obtain_filterIsClean(qrcode);
        this.obtain_mainFilterStatus(qrcode);
        this.obtainMaterialsUrl(modelId);
      }
    });
  };

  //获取滤网是否需要清洗
  obtain_filterIsClean(qrcode){
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

  //获取高效滤网状态
  obtain_mainFilterStatus(qrcode){
    machine_service.obtain_mainFilter_status(qrcode).then((response) =>{
      if (response.responseCode === "RESPONSE_OK") {
        if(response.data.replaceStatus === "NO_NEED"){
            this.mainFilterNotNeed()

        }else if(response.data.replaceStatus === "NEED"){
            this.mainFilterNeed()

        }else if(response.data.replaceStatus === "URGENT_NEED"){
            this.mainFilterUrgentNeed()
        }
      }else{
        this.setState({
          mainFilterIfObtain:false
        })
      }
    })
  }

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
  confirmFilterClean (){
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

  //高效滤网不需要更换
  mainFilterNotNeed = () =>{
    let filterImgUrl = require("../../material/filter_icon/2.png");
    let filterInfo = "";
    this.setState({
      main_text_style_color:"black",
      main_message_style_color:"#orange",
    })
    this.props.changeMainFilterStatus(filterImgUrl,filterInfo,"NOT_NEED",false);

  }
  //高效滤网即将到期
  mainFilterNeed = () =>{
    let filterImgUrl = require("../../material/filter_icon/4.png");
    let filterInfo = "即将到期";
    this.props.changeMainFilterStatus(filterImgUrl,filterInfo,"NEED",true);
  }
  //高效滤网立即更换
  mainFilterUrgentNeed = () =>{
    let filterImgUrl = require("../../material/filter_icon/5.png");
    let filterInfo = "立即更换";
    this.props.changeMainFilterStatus(filterImgUrl,filterInfo,"URGENT_NEED",true);
    this.setState({
      main_text_style_color:"#eb4744",
      main_message_style_color:"#eb4744",
    })
  }

  //高效滤网确认更换
  confirmMainFilterStatus(){
    let mainAlert = Modal.alert;
    if (this.props.mainFilterStatus === "NOT_NEED") {
      mainAlert("温馨提示", "高效率网建议每3-4月更换一次，如果您已经更换，请点击确定", [
        { text: "取消", onPress: () => console.log("cancel") },
        { text: "确认", onPress: () => {
            machine_service.confirm_mainFilter_status(this.props.qrcode);
            this.changeFilterToNotClean();
          } },
      ]);
    }else{
      mainAlert("温馨提示", "您的高效滤网还未到更换时间，若您已提前更换，请点击确认", [
        { text: "取消", onPress: () => console.log("cancel") },
        { text: "确认", onPress: () => {
            machine_service.confirm_mainFilter_status(this.props.qrcode);
          } },
      ]);
    }
  }

  //购买高效滤网
  obtainMaterialsUrl(modelId){
    machine_service.obtain_materials_link(modelId).then((response) =>{
      if (response.responseCode === "RESPONSE_OK"){
        this.setState({
          materialsUrl:response.data.materialsLink,
        })
      }
    })
  }

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

    const main_text_style = {
      fontSize: "1.3rem",
      color: this.state.main_text_style_color,
      marginLeft:"5px",
    };

    const main_message_style = {
      WebkitTransform: "scale(0.7)",
      color: this.state.main_message_style_color,
      marginLeft: "-7px",
    };

    const buy_style = {
      display:"flex",
      height: "28px",
      background: "#00A2E9",
      alignItems: "center",
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
    const buyText_a_style = {
      color:"white"
    }

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

          <div style={panel_item}>
            {
              this.state.mainFilterIfObtain
                &&
              <div style={item_style} onClick={this.confirmMainFilterStatus}>
                <div style={main_text_style}>主滤网</div>
                <img src={this.props.mainFilterImgUrl} style={img_style}></img>
                <div style={main_message_style}>{this.props.mainFilterInfo}</div>
              </div>
            }
          </div>
          
          <div style={panel_item}>
            {
              this.state.mainFilterIfObtain
                &&
              this.props.buyFilter
                &&
              <div style={buy_style} >
                <div style={buyText_style}>
                  <a href={this.state.materialsUrl} style={buyText_a_style}>购买滤网</a>
                </div>
              </div>
            }

           </div>
        </div>
      </div>
    );
  }
}
