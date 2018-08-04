import React from 'react'

import {Well} from 'react-bootstrap'

import {Card} from 'antd-mobile'

import Navigation from '../navigation/navigation'
import {consumerservice} from "../service/consumer.service";

const person_info_area = {
    width: `100%`,
    height: `100%`
}

const person_card = {
    marginTop: `1.5rem`
}

const personal_info_item = {
    height: `3rem`,
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
            if (response.responseCode == 'RESPONSE_OK') {
                let person = response.data;
                console.log(JSON.stringify(person));
                let address = person.province + (person.city == null ? '': person.city) + (person.district === 'null' ? '' : person.district);
                this.setState({name: person.name, mobile: person.phone, address: address})
            } else
                {

                }
            }
        );
    }

    render() {
        return (
            <div style={person_info_area}>
                <Card style={person_card}>
                    <Card.Header title='个人信息' extra='...'></Card.Header>
                    <Card.Body>
                        <div style={personal_info_item}>
                            <span><i className='glyphicon glyphicon-user'></i></span>
                            {this.state.name}
                        </div>
                        <div style={personal_info_item}>
                            <span><i className='glyphicon glyphicon-phone'></i></span>
                            {this.state.mobile}
                        </div>
                        <div style={personal_info_item}>
                            <span><i className='glyphicon glyphicon-map-marker'></i></span>
                            {this.state.address}
                        </div>
                    </Card.Body>
                </Card>
                <div style={personal_info_item}>
                    绑定微信
                </div>
                <Navigation index={1}/>
            </div>
        )
    }
}

export default Person;