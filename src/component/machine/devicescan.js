import React from 'react'

import scan from './scan.png'

const scan_area = {
    width: `100%`,
    textAlign: `center`,
    marginTop: `1.5rem`,
    marginBottom: `5.5rem`
};

const scan_style = {
    width: `8rem`,
    height: `8rem`
};

class DeviceScan extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={scan_area} onClick={this.props.scan}>
                <div>
                    <img src={scan} style={scan_style}/>
                </div>
                <div>添加设备</div>
            </div>
        )
    }
}

export default DeviceScan;