import React from 'react';

const gmair_machine_item = {
    width: `100%`,
    height: `9.5rem`,
    padding: `1.5rem 0`,
    borderTop: `solid 0.1rem #C9C9C9`,
    borderBottom: `solid 0.1rem #C9C9C9`
}

const gmair_machine_pm2_5 = {
    width: `30%`,
    paddingLeft: `5%`,
    fontSize: `4.5rem`,
    letterSpacing: `0.2rem`,
    fontWeight: `lighter`,
    float: `left`,
    textAlign: `center`,
    height: `6.4rem`
}

const gmair_machine_operation = {
    width: `16%`,
    height: `6.4rem`,
    verticalAlign: `baseline`,
    float: `left`,
    textAlign: `center`,
    color: `#58595B`,
    fontWeight: `lighter`
}

const gmair_machine_power = {
    width: `4rem`,
    height: `4rem`,
    fontSize: `2.5rem`,
    fontWeight: `lighter`
}

const gmair_pm2_5_attr = {
    marginTop: `0.5rem`
}

const gmair_machine_index = {
    width: `54%`,
    float: `left`,
    height: `6.4rem`,
    textAlign: `center`
}

const gmair_machine_name = {
    paddingTop: `0.4rem`,
    fontWeight: `lighter`
}

const gmair_machine_desc = {
    marginTop: `1.5rem`,
    fontWeight: `lighter`
}

const gmair_machine_desc_item = {
    marginLeft: `1rem`
}

class MachineItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={gmair_machine_item}>
                <div style={gmair_machine_pm2_5} className='gmair_machine_item_pm2_5'>000</div>
                <div style={gmair_machine_operation}>
                    <div><span style={gmair_machine_power}><i className='glyphicon glyphicon-off'></i></span></div>
                    <div style={gmair_pm2_5_attr}>ug/m³</div>
                </div>
                <div style={gmair_machine_index}>
                    <div style={gmair_machine_name}>卧室</div>
                    <div style={gmair_machine_desc}>
                        <span style={gmair_machine_desc_item}><i className='fa fa-superpowers'></i> 320m³/h</span>
                        <span style={gmair_machine_desc_item}><i className='fa fa-thermometer'></i> 26°C</span>
                        <span style={gmair_machine_desc_item}><i className='glyphicon glyphicon-tint'></i>60%</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default MachineItem;