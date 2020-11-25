import React, { Component } from "react";
import {Icon, NavBar} from "antd-mobile";
import {Table,message} from  "antd";
import { machine_service } from "../service/mahcine.service";
import {createBrowserHistory} from 'history'
import {datetimeService} from "../service/dateTime.service";
const history = createBrowserHistory();


class UserList extends Component{

    constructor() {
        super();
        this.obtain_userList = this.obtain_userList.bind(this)
        this.deleteUser = this.deleteUser.bind(this)

        this.state={
            userList:"",
            qrcode:""
        }

    }

    componentDidMount(){
        this.obtain_userList(this.props.match.params.qrcode)
        this.setState({
            qrcode:this.props.match.params.qrcode
        })
    }

    //获取用户列表
    obtain_userList(qrcode){
        machine_service.obtain_userList(qrcode).then(response => {
            if (response.responseCode === "RESPONSE_OK"){
                let dataSource = response.data.userlist;
                for (let i = 0; i < response.data.size; i++) { //时间格式转换
                    dataSource[i]['createAt'] = datetimeService.formatTimeStampToDate(dataSource[i].createAt);
                }
                this.setState({
                    userList:dataSource
                })
            }
        })
    }

    //删除用户
    deleteUser(bindId){

        machine_service.delete_user(bindId,this.state.qrcode).then(response => {
            if (response.responseCode === "RESPONSE_OK"){
                message.success('删除成功')
            }
        })
    }

    render() {
        const setting_container = {
            height: window.innerHeight,
            width: window.innerWidth,
         //   backgroundColor: `#dbdbdb`
        }
        const setting_gap = {
            width: `100%`,
            height: `1.4rem`,
            backgroundColor: `#dbdbdb`,
        };
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '加入时间',
                dataIndex: 'createAt',
                key: 'createAt',
            },
            {
                title: '操作',
                key: 'x',
                render: (item) => <a onClick={()=>this.deleteUser(item.bindId)}>删除</a>,
            },
        ];

        return(
            <div>
                <div style={setting_container}>
                    <NavBar
                        mode="light"
                        leftContent={[<Icon key="return" type="left"/>]}
                        onLeftClick={() => {
                            history.back();
                        }}
                    >用户列表</NavBar>
                    <div style={setting_gap} />
                    <Table
                        columns={columns}
                        dataSource={this.state.userList}
                        pagination={false}
                        size="middle"
                    />,
                </div>
            </div>
        )
    }
}

export default UserList
