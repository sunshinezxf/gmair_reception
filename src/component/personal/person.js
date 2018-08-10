import React from 'react'

import {Card} from 'antd-mobile'

import Navigation from '../navigation/navigation'
import {consumerservice} from "../service/consumer.service";

import {Button, ButtonToolbar} from 'react-bootstrap'

const person_info_area = {
    width: `100%`,
    height: `100%`
}

const person_card = {
    marginTop: `1.5rem`
}

const personal_info_item = {
    height: `3rem`,
    width: `85%`,
    margin: `3rem 7.5%`,
    textAlign: `left`
}

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            mobile: '',
            address: '',
            wechat: '',
            bind: false
        }
    }

    componentDidMount() {
        consumerservice.profile().then(response => {
                if (response.responseCode === 'RESPONSE_OK') {
                    let person = response.data;
                    console.log(person)
                    let address = (person.province == null ? '' : person.province) + (person.city == null ? '' : person.city) + (person.district === 'null' ? '' : person.district) + person.address;
                    this.setState({name: person.name, mobile: person.phone, address: address, wechat: person.wechat})
                }
                if (response.responseCode === 'RESPONSE_ERROR') {
                    window.location.href = '/login';
                    return;
                }
            }
        );
    }

    bind_wechat = () => {
        consumerservice.bind_wechat();
    }

    unbind_wechat = () => {

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
                    <ButtonToolbar>
                        <Button bsStyle={this.state.bind === true ? "success" : "danger"} block>
                            {this.state.bind === true ? "绑定微信" : "解绑微信"}
                        </Button>
                    </ButtonToolbar>
                </div>
                <Navigation index={1}/>
            </div>
        )
    }
}

export default Person;