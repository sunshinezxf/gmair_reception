import React from 'react'

import {Well} from 'react-bootstrap'

import Navigation from '../navigation/navigation'
import {consumerservice} from "../service/consumer.service";

const person_info_area = {
    width: `100%`,
    height: `100%`
}

const personal_info_item = {
    height: `7rem`,
    width: `100%`,
    textAlign: `left`
}

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            mobile: '',
            address: '',
            wechat: ''
        }
    }

    componentDidMount() {
        consumerservice.profile().then(response => {
            console.log(JSON.stringify(response));
            if (response.responseCode === 'RESPONSE_OK') {

            } else {

            }
        });
    }

    render() {
        return (
            <div style={person_info_area}>
                <div style={personal_info_item}>
                    <Well>
                        <span><i className='fa fa-user'></i></span>姓名
                    </Well>
                </div>
                <div style={personal_info_item}>
                    <Well>
                        <span><i className='glyphicon glyphicon-phone'></i></span>电话
                    </Well>
                </div>
                <div style={personal_info_item}>
                    <Well>
                        <span><i className='glyphicon glyphicon-map-marker'></i></span>
                        地址
                    </Well>
                </div>
                <div style={personal_info_item}>
                    绑定微信
                </div>
                <Navigation index={1}/>
            </div>
        )
    }
}

export default Person;