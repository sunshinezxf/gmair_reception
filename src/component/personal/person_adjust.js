import React,{Component} from 'react'

import {InputItem, Picker, List, Button, WhiteSpace, WingBlank, NavBar, Icon} from 'antd-mobile'
import {consumerservice} from "../service/consumer.service";
import createHistory from 'history/createBrowserHistory'
import data from 'china-area-data'

const history = createHistory();
class PersonAdjust extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            phone:'',
            province:'',
            city:'',
            district:'',
            address:'',
            area_list:[],
            submit_ready:false,
        }

        this.usernameChange = this.usernameChange.bind(this);
        this.addressChange = this.addressChange.bind(this);
        this.areaChange = this.areaChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount(){
        this.obtain_person();
        this.adjust_area();
    }

    adjust_area(){
        // console.log(data)
        let list = [];
        let province = data["86"]
        for(let key in province){
            let json = {}
            json['key'] = key
            json['value'] = province[key]
            json['label'] = province[key]
            let province_children = []
            let city = data[key]
            for(let key2 in city){
                let json2 = {}
                json2['key'] = key2
                json2['value'] = city[key2]
                json2['label'] = city[key2]
                let city_children = []
                let district = data[key2]
                for(let key3 in district){
                    let json3 = {}
                    json3['key'] = key3
                    json3['value'] = district[key3]
                    json3['label'] = district[key3]
                    city_children.push(json3)
                }
                json2['children'] = city_children
                province_children.push(json2)
            }
            json['children'] = province_children
            list.push(json)
        }
        this.setState({
            area_list:list
        })
    }

    obtain_person(){
        consumerservice.profile().then(response=>{
            if(response.responseCode==="RESPONSE_OK"){
                let person = response.data
                this.setState({
                    username:person.username,
                    phone:person.phone,
                    province:person.province,
                    city:person.city,
                    district:person.district,
                    address:person.address,
                })
            }
        })
    }

    usernameChange(e){
        this.setState({
            username:e
        })
        this.submit_ready(e,this.state.province,this.state.address)
    }

    addressChange(e){
        this.setState({
            address:e
        })
        this.submit_ready(this.state.username,this.state.province,e)
    }

    areaChange(e){
        console.log(e[0])
        this.setState({
            province:e[0],
            city:e[1],
            district:e[2],
            address:'',
        })
        this.submit_ready(this.state.username,e[0],'')
    }

    submit_ready(username,province,address){
        if(username===""||province===""||address==""){
            this.setState({
                submit_ready:false
            })
        }else {
            this.setState({
                submit_ready:true
            })
        }
    }

    submit(e){
        this.setState({
            submit_ready:false
        })
        consumerservice.update_user(this.state.username).then(response=>{
            if(response.responseCode==="RESPONSE_OK"){
                consumerservice.update_address(this.state.province,this.state.city,this.state.district,this.state.address).then(res=>{
                    if(response.responseCode==="RESPONSE_OK"){
                        history.goBack();
                    }
                })
            }
        })
    }

    render(){
        const person_info_area = {
            width: `100%`,
            height: `100%`,
            backgroundColor: `#f2f2f2`
        }
        const setting_gap = {
            width: `100%`,
            height: `1.4rem`,
            backgroundColor: `#f2f2f2`,
        }
        const setting_content = {
            backgroundColor: `white`,
            width: `100%`,
            borderRadius: `3px`,
        }
        const setting_item = {
            display:'flex',
            padding:'0 6%',
            alignItems:'center'
        }
        const item_left={
            width:'2rem'
        }
        const item_right={
            // display:'flex',
            // flex: 15,
            width:'100%'
        }
        const seperate_div = {
            height: `0.1rem`,
            backgroundColor: `#f2f2f2`,
        }
        const bottom_button={
            position:'absolute',
            zIndex:100,
            bottom:'40px',
            width:'100%'
        }
        let {username,phone,province,city,district,address,area_list,submit_ready} = this.state;
        return (
            <div style={person_info_area}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {history.goBack();}}
                >信息修改</NavBar>
                <div className="setting_gap" style={setting_gap}></div>
                <div className="setting_content" style={setting_content}>
                    <div className="setting_item" style={setting_item}>
                        <div style={item_left}><i className="fa fa-user fa-lg" aria-hidden="true"></i></div>
                        <div style={item_right}><InputItem placeholder="用户名" clear={true} value={username} onChange={this.usernameChange}></InputItem></div>
                    </div>
                </div>
                <div className="seperate_div" style={seperate_div}></div>
                <div className="setting_content" style={setting_content}>
                    <div className="setting_item" style={setting_item}>
                        <div style={item_left}><i className="fa fa-mobile fa-2x" aria-hidden="true"></i></div>
                        <div style={item_right}>
                            <InputItem placeholder="联系方式" disabled={true} extra="不可修改" value={phone}></InputItem>
                        </div>
                    </div>
                </div>
                <div className="seperate_div" style={seperate_div}></div>
                <div className="setting_content" style={setting_content}>
                    <div className="setting_item" style={setting_item}>
                        <div style={item_left}><i className="fa fa-location-arrow fa-lg" aria-hidden="true"></i></div>
                        <div style={item_right}>
                            <div style={{paddingLeft:'15px'}}>
                                <Picker
                                    style={{fontSize:'20px'}}
                                    value={[province,city,district]}
                                        data={area_list}
                                        title="Areas"
                                    onChange={this.areaChange}
                                >
                                    <List.Item arrow="horizontal">省市区选择</List.Item>
                                </Picker>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="seperate_div" style={seperate_div}></div>
                <div className="setting_content" style={setting_content}>
                    <div className="setting_item" style={setting_item}>
                        <div style={item_left}><i className="fa fa-map-marker fa-lg" aria-hidden="true"></i></div>
                        <div style={item_right}><InputItem placeholder="详细地址" clear={true} value={address} onChange={this.addressChange}></InputItem></div>
                    </div>
                </div>
                <div style={bottom_button}>
                    <WingBlank><Button type="primary" onClick={this.submit} disabled={!submit_ready}>保存</Button></WingBlank>
                </div>
            </div>
        )
    }
}

export default PersonAdjust;
