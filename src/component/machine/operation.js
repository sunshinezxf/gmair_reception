import React, {Component} from 'react';
// import SettingSelect from '../../containers/machine/operation';
import SettingSelect from '../../containers/machine/settingSelect';
import {NavBar, Icon} from 'antd-mobile';

class MachineOperation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 0,
            qrcode: '',
        }
    }

    componentDidMount() {
        let qrcode = this.props.match.params.qrcode;
        this.setState({
            qrcode:qrcode,
        })
    }

    render() {
        const setting_container = {
            height: window.innerHeight,
            width: window.innerWidth,
            backgroundColor: `#dbdbdb`
        }
        const setting_header = {
            textAlign: 'center',
            backgroundColor: '#00AEEF',
            color: 'white',
            borderBottomRightRadius: `3px`,
            borderBottomLeftRadius: `3px`,
            height: `38px`,
            lineHeight: `38px`,
            fontSize: `16px`,

        }
        return (

            <div>
                <div className="setting_container" style={setting_container}>
                    <NavBar
                        mode="dark"
                        leftContent={[<Icon type="left"/>]}
                        onLeftClick={() => {
                            window.location.href = "/machine/detail/" +this.state.qrcode
                        }}
                    >NavBar</NavBar>
                    {this.state.mode === 0 &&
                    <SettingSelect/>
                    }
                </div>
            </div>
        )
    }
}


export default MachineOperation;