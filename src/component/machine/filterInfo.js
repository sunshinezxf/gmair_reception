import React, { Component } from 'react'
import {machine_service} from "../service/mahcine.service"

export default class filterInfo extends Component {

  constructor(props) {
     super(props);
     this.state={
       filterIsClean:false,
       
     }

     this.obtain_filterIsClean = this.obtain_filterIsClean.bind(this);
     

  }

  componentDidMount(){
    this.obtain_filterIsClean(this.props.qrcode);
  }

  //获取滤网是否需要清洗
  obtain_filterIsClean = (qrcode) => {
    machine_service.obtain_filter_isClean(qrcode).then((response) => {
      if (response.responseCode === "RESPONSE_OK") {
        this.setState({filterIsClean:response.data.isNeedClean})
      }
    });
  };

  render() {
  
    const item_style = {

      height: "22px",
      color: "#333",
      borderRadius: "1rem",
      background:"#f2f2f2",
      display:"flex",
      alignItems:"center"
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

    const message_style = {
      display: "inline-block",
      WebkitTransform: "scale(0.7)",
      color: "orange",
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
          false
          &&
          <div style={item_style}>
            <div style={text_style}>主滤网</div>
            <img src={require("../../material/filter_icon/4.png")} style={img_style}></img>
            <div style={message_style}>即将到期</div>
          </div>
        }
   
        </div>
    )
  }
}
