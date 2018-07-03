import React from 'react';

const gmair_machine_item = {
    width: `100%`,
    borderTop: `solid 0.1rem #`
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
    width: `10%`,
    height: `6.4rem`,
    verticalAlign: `baseline`,
    float: `left`,
    textAlign: `center`,
    fontFamily: `FZLanTingKanHei-R-GBK`,
    color: `#58595B`
}

const gmair_machine_index = {
    width: `60%`,
    float: `left`,
    height: `6.4rem`
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
                    <div>电源开关</div>
                    <div>ug/m³</div>
                </div>
                <div style={gmair_machine_index}>
                    <div>指数</div>
                    <div>数据</div>
                </div>
            </div>
        )
    }
}

export default MachineItem;