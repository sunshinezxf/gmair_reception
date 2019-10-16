import React,{Component} from 'react';
import store from './store'
import {clickWindAction} from './store/actionCreators'
import OnOffHeader from './onOffHeader'
import WindController from './windController'
import TemperatureController from './temperatureController'

class FanContent extends Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        console.log(this.state);
        this.storeChange = this.storeChange.bind(this);
        this.clickWind = this.clickWind.bind(this);
        store.subscribe(this.storeChange);
    }

    render(){
        return (
            <div>
                <OnOffHeader></OnOffHeader>
                <WindController
                    clickWind={this.clickWind}
                    windTemperature={this.state.windTemperature}
                ></WindController>
            </div>
        )
    }

    storeChange(){
        this.setState(store.getState());
    }

    clickWind(windTemperature){
        const action = clickWindAction(windTemperature);
        store.dispatch(action);
    }
}

export default FanContent
