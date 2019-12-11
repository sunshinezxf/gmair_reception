import React,{Component} from 'react';
import power_icon from "../../material/icon/power.png";

class ControlItem extends Component{
    constructor(props) {
        super(props);
        this.state={

        }

    }

    componentDidMount(){
        console.log(this.props.src)
    }

    render() {
        const item_style={
            width:'64px',
            height:'64px',
            background:'white',
            color:'#00A2E9',
            display:'flex',
            alignItems:'center',
            flexDirection:'column',
            borderRadius:'1rem',
            border:'1px dashed #00A2E9'
        }

        const icon_style={
            flex:3,
            display: 'flex',
            justifyContent:'flex-end',
            alignItems: 'flex-end',
            fontSize: '1.5em'
        }

        const text_style={
            fontSize:'1.3rem',
            color: 'black',
            flex: 2,
            display: 'flex',
            justifyContent:'center',
            alignItems:'center'
        }

        return (
            <div style={item_style}>
                <div style={icon_style}><i className={this.props.src} aria-hidden="true"></i></div>
                <div style={text_style}>{this.props.text}</div>
            </div>
        );
    }

}

export default ControlItem;
