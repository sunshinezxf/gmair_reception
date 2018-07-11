import React from 'react'

const gmair_machine_index = {
    width: `100%`,
    padding: `2rem 7.5%`,
    textAlign: `center`
}

const gmair_machine_pm2_5 = {
    color: `#00AEEF`,
    textAlign: `left`,
    fontWeight: `10`
}

const gmair_machine_pm2_5_value = {
    height: `10rem`,
    lineHeight: `10rem`,
    fontFamily: `Helvetica`,
    fontSize: `9.5rem`,
    fontWeight: `lighter`,
    width: `70%`,
    float: `left`,
    letterSpacing: `0.55rem`,
    textAlign: `left`
}

const gmair_machine_index_desc = {
    width: `30%`,
    float: `left`
}

const gmair_machine_index_desc_item = {
    paddingLeft: `0.5rem`
}

class MachineDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qrcode: ''
        }
    }

    componentDidMount() {
        let qrcode = this.props.match.params.qrcode;
        this.setState({qrcode: qrcode});
    }

    render() {
        return (
            <div>
                <div style={gmair_machine_index}>
                    <div style={gmair_machine_pm2_5}>PM2.5 优</div>
                    <div>
                        <div style={gmair_machine_pm2_5_value}>003</div>
                        <div style={gmair_machine_index_desc}>
                            <div style={gmair_machine_index_desc_item}>320</div>
                            <div style={gmair_machine_index_desc_item}>320</div>
                            <div style={gmair_machine_index_desc_item}>320</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MachineDetail;