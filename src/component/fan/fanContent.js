import React,{Component} from 'react';
import OnOffHeader from './onOffHeader'
import WindController from '../../containers/fan/windController'
import TemperatureController from './temperatureController'

class FanContent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <OnOffHeader></OnOffHeader>
                <WindController></WindController>
            </div>
        )
    }

    // storeChange(){
    //     this.setState(store.getState());
    // }
}

export default FanContent;
