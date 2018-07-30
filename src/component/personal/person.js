import React from 'react'

import Navigation from '../navigation/navigation'

const person_info_area = {
    width: `100%`,
    height: `100%`
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

    render() {
        return (
            <div style={person_info_area}>
                <div>Name</div>
                <div>Mobile</div>
                <div>Address</div>
                <div>Wechat</div>
                <Navigation index={1} />
            </div>
        )
    }
}

export default Person;