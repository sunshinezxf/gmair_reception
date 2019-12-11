import React,{Component} from 'react';
import fresh_header_image from '../../material/bg/fresh_bg.jpg';
import power_icon from '../../material/icon/power.png'
import './fresh.css'
class FreshHeader extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
                <div className="fresh_header_bg">
                    <img src={fresh_header_image} width="100%"/>
                    <div className="header_container">
                        <span>
                            <i className="fa fa-picture-o header_icon_size"   aria-hidden="true"></i></span>
                        <span onClick={() => {
                            console.log('hhh')
                        }}><i className='fa fa-cog header_icon_size_2'></i> </span>
                    </div>
                    {this.props.online&&
                    <div className="on_off_panel">
                        <img src={power_icon} width="22rem" ></img>
                        <div className="on_off_text">已开启</div>
                    </div>
                    }
                    {!this.props.online&&
                    <div className="off_on_panel">
                        <img src={power_icon} width="22rem" ></img>
                        <div className="on_off_text">已关闭</div>
                    </div>
                    }

                </div>
        );
    }

}
export default FreshHeader;
