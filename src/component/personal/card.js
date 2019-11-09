import React,{Component} from 'react'
import {NavBar, Icon} from 'antd-mobile'
import {consumerservice} from "../service/consumer.service";

class PersonalCard extends Component{
    constructor(props){
        super(props);

        this.state={
            person:{}
        }
    }

    componentDidMount(){
        this.obtain_person();
    }

    obtain_person(){
        consumerservice.profile().then(response=>{
            if(response.responseCode==="RESPONSE_OK"){
                let person = response.data
                this.setState({
                    person:person
                })
            }
        })
    }

    render(){


        const setting_content = {
            backgroundColor: `white`,
            width: `100%`,
            borderRadius: `3px`,
        }
        const setting_gap = {
            width: `100%`,
            height: `1.4rem`,
            backgroundColor: `#f2f2f2`,
        }
        const setting_item = {
            display:'flex',
            fontSize: `1.45rem`,
            padding:'0.9rem 6%',
            alignItems:'center'
        }
        const item_left={
            display: 'flex',
            flex:1,
            alignItems: 'center',
        }
        const item_right={
            display:'flex',
            flex: 2,
            justifyContent:'flex-end'
        }
        const seperate_div = {
            height: `0.1rem`,
            backgroundColor: `#f2f2f2`,
        }

        const icon_item={
            display:'flex',
            width:'20%',
        }

        let {person} = this.state;
        return (
            <div>
                <NavBar
                    mode="light"
                    rightContent={[
                        <Icon key="1" type="ellipsis" />,
                    ]}
                    onClick={() => {
                        console.log('hh')
                        window.location.href = "/personal/adjust"
                    }}
                >个人信息</NavBar>
                <div className="setting_gap" style={setting_gap}></div>
                <div className="setting_content" style={setting_content}>
                    <div className="setting_item" style={setting_item}>
                        <div style={item_left}>
                            <div style={icon_item}><i className="fa fa-user" aria-hidden="true"></i></div>
                            <div>用户</div>
                        </div>
                        <div style={item_right}>{person.username}</div>
                    </div>
                </div>
                <div className="seperate_div" style={seperate_div}></div>
                <div className="setting_content" style={setting_content}>
                    <div className="setting_item" style={setting_item}>
                        <div style={item_left}>
                            <div style={icon_item}><i className="fa fa-mobile fa-lg" aria-hidden="true"></i></div>
                            <div>联系方式</div>
                        </div>
                        <div style={item_right}>{person.phone}</div>
                    </div>
                </div>
                <div className="seperate_div" style={seperate_div}></div>
                <div className="setting_content" style={setting_content}>
                    <div className="setting_item" style={setting_item}>
                        <div style={item_left}>
                            <div style={icon_item}><i className="fa fa-location-arrow" aria-hidden="true"></i></div>
                            <div>省市区</div>
                         </div>
                        <div style={item_right}>{person.province+person.city+person.district}</div>
                    </div>
                </div>
                <div className="seperate_div" style={seperate_div}></div>
                <div className="setting_content" style={setting_content}>
                    <div className="setting_item" style={setting_item}>
                        <div style={item_left}>
                            <div style={icon_item}><i className="fa fa-map-marker" aria-hidden="true"></i></div>
                            <div>详细地址</div>
                        </div>
                        <div style={item_right}>{person.address}</div>
                    </div>
                </div>
                <div className="setting_gap" style={setting_gap}></div>
                <div className="setting_content" style={setting_content}>
                    <div className="seperate_div" style={seperate_div}></div>
                    <div className="setting_item" style={setting_item}>
                        <div style={item_left}>版本号</div>
                        <div style={item_right}>1.0</div>
                    </div>
                    <div className="seperate_div" style={seperate_div}></div>
                    <div className="setting_item" style={setting_item}>
                        <div style={item_left}>固件信息</div>
                        <div style={item_right}>1.0</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PersonalCard;
