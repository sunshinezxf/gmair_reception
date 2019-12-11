import React,{Component} from 'react';
import FreshHeader from '../../containers/fresh/header'
import OperationPanel from '../../containers/fresh/operation_panel';
import MachineData from '../../containers/fresh/machine_data';
import Chart from '../machine/pm2_5charts'
import './fresh.css'

class FreshPanel extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let qrcode = this.props.match.params.qrcode
        console.log(qrcode)
        this.props.changeQrcode(qrcode)
    }

    render() {
        return (
            <div>
                <FreshHeader/>
                <div className="separate_div"></div>
                <MachineData/>
                <div className="separate_div"></div>
                <OperationPanel/>
                <div className="separate_div"></div>
                <div className="operation_panel">
                    <Chart/>
                </div>
            </div>
        );
    }

}

export default FreshPanel;
