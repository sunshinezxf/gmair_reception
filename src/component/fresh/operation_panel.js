import React,{Component} from 'react';
import ControlItem from './control_item';
import './fresh.css'

class OperationPanel extends Component{
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div className="operation_panel">
                <div className="operation_panel_row">
                    <div className="operation_panel_item">
                        <ControlItem src="fa fa-power-off" text="电源"/>
                    </div>
                    <div className="operation_panel_item">
                        <ControlItem src="fa fa-recycle" text="风量"/>
                    </div>
                    <div className="operation_panel_item">
                        <ControlItem src="fa fa-tags" text="模式"/>
                    </div>
                </div>
                <div className="separate_div_2"></div>
                <div className="operation_panel_row">
                    <div className="operation_panel_item">
                        <ControlItem src="fa fa-desktop" text="屏显"/>
                    </div>
                    <div className="operation_panel_item">
                        <ControlItem src="fa fa-thermometer-empty" text="辅热"/>
                    </div>
                    <div className="operation_panel_item">
                        <ControlItem src="fa fa-child" text="童锁"/>
                    </div>
                </div>
            </div>
        );
    }

}

export default OperationPanel;
