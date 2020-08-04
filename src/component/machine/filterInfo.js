import React, { Component } from 'react'
import {machine_service} from "../service/mahcine.service"

export default class filterInfo extends Component {

  constructor(props) {
     super(props);
     this.state={
       filterIsClean:false,
       mainFilterIsReplace:false,
       mainFilterInfo:"",
       mainFilterImg:"",
       main_text_style_color:"black",
       main_message_style_color:"orange",
     }

     this.obtain_filterIsClean = this.obtain_filterIsClean.bind(this);
     this.obtain_mainFilterStatus = this.obtain_mainFilterStatus.bind(this);

  }

  componentDidMount(){
    this.obtain_filterIsClean(this.props.qrcode);
    this.obtain_mainFilterStatus(this.props.qrcode);
  }

  //获取滤网是否需要清洗
  obtain_filterIsClean (qrcode){
    machine_service.obtain_filter_isClean(qrcode).then((response) => {
      if (response.responseCode === "RESPONSE_OK") {
        this.setState({filterIsClean:response.data.isNeedClean})
      }
    });
  };

  //获取高效滤网状态
  obtain_mainFilterStatus(qrcode){
    machine_service.obtain_mainFilter_status(qrcode).then((response)=>{
      if (response.responseCode === "RESPONSE_OK") {
        if(response.data.replaceStatus === "NO_NEED"){
          this.setState({
            mainFilterIsReplace:false
          })

        }else if(response.data.replaceStatus === "NEED"){

          this.setState({
            mainFilterIsReplace:true,
            mainFilterInfo:"即将到期",
            mainFilterImg:require("../../material/filter_icon/4.png"),
          })

        }else if(response.data.replaceStatus === "URGENT_NEED"){
          this.setState({
            mainFilterIsReplace:true,
            mainFilterInfo:"立即更换",
            mainFilterImg:require("../../material/filter_icon/5.png"),
            main_text_style_color:"#eb4744",
            main_message_style_color:"#eb4744",
          })
        }
      }
    })
  }

  render() {
  
    const item_style = {

      height: "22px",
      color: "#333",
      borderRadius: "1rem",
      background:"#f2f2f2",
      display:"inline",
      alignItems:"center",
      marginLeft:"10px",
    };

    const panel_row = {
      display: "inline-block",
    };

    const img_style = {
      display: "inline-block",
      width: "10px",
      height: "10px",
      marginLeft: "-4px",
    };

    const text_style = {
      fontSize: "12px",
      color: "black",
      display: "inline-block",
      margin: "5px",
      
    };

    const main_text_style = {
      fontSize: "12px",
      color: this.state.main_text_style_color,
      display: "inline-block",
      margin: "5px",
    }

    const message_style = {
      display: "inline-block",
      WebkitTransform: "scale(0.7)",
      color: "orange",
      marginLeft: "-5px",
      fontSize:"10px",
    };

    const main_message_style = {
      display: "inline-block",
      WebkitTransform: "scale(0.7)",
      color: this.state.main_message_style_color,
      marginLeft: "-5px",
      fontSize:"10px",
    };



    return (
      <div style={panel_row}>
        {
          this.state.filterIsClean
          &&
          <div style={item_style}>
            <div style={text_style}>初滤网</div>
            <img src={require("../../material/filter_icon/3.png")} style={img_style}></img>
            <div style={message_style}>立即清洗</div>
          </div>
        }
        {
          this.state.mainFilterIsReplace
          &&
          <div style={item_style}>
            <div style={main_text_style}>主滤网</div>
            <img src={this.state.mainFilterImg} style={img_style}></img>
            <div style={main_message_style}>{this.state.mainFilterInfo}</div>
          </div>
        }
   
        </div>
    )
  }
}
